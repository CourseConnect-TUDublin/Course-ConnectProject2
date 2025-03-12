"use client";

import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// SWR fetcher function that throws an error if not ok.
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while fetching data.");
  }
  return res.json();
};

export default function StudySessionsPage() {
  // SWR fetch with a polling interval for near real-time updates (every 5 seconds)
  const { data: sessions, error } = useSWR("/api/sessions", fetcher, { refreshInterval: 5000 });
  
  // Local state for the create/edit form modal.
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [formData, setFormData] = useState({
    topic: "",
    startTime: "",
    endTime: "",
    location: "",
    notes: "",
  });
  
  // Sorting and filtering state.
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc by startTime
  const [searchTerm, setSearchTerm] = useState("");

  // Open dialog for creating or editing session.
  const handleOpenDialog = (session = null) => {
    if (session) {
      setEditingSession(session);
      setFormData({
        topic: session.topic || "",
        startTime: session.startTime ? new Date(session.startTime).toISOString().slice(0, 16) : "",
        endTime: session.endTime ? new Date(session.endTime).toISOString().slice(0, 16) : "",
        location: session.location || "",
        notes: session.notes || "",
      });
    } else {
      setEditingSession(null);
      setFormData({ topic: "", startTime: "", endTime: "", location: "", notes: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSession(null);
    setFormData({ topic: "", startTime: "", endTime: "", location: "", notes: "" });
  };

  // Create or update session based on editingSession value.
  const handleSubmit = async () => {
    if (!formData.topic.trim() || !formData.startTime || !formData.endTime) {
      toast.error("Topic, Start Time, and End Time are required.");
      return;
    }
    // Construct the payload; for updates, include the session id.
    const payload = {
      topic: formData.topic,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
      location: formData.location,
      notes: formData.notes,
    };

    try {
      let res;
      if (editingSession) {
        // For updates, assume PUT endpoint: /api/sessions?id=<id>
        res = await fetch(`/api/sessions?id=${editingSession.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // For creation, use POST
        res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save session");
      }
      toast.success(editingSession ? "Session updated!" : "Session created!");
      // Revalidate sessions
      mutate("/api/sessions");
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Delete a session
  const handleDelete = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      const res = await fetch(`/api/sessions?id=${sessionId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete session");
      }
      toast.success("Session deleted");
      mutate("/api/sessions");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Filter and sort sessions based on search term and sort order.
  const filteredSessions = sessions
    ? sessions
        .filter((session) => {
          const topic = session.topic || "";
          return topic.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => {
          const dateA = new Date(a.startTime);
          const dateB = new Date(b.startTime);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        })
    : [];

  if (error) return <Typography color="error">Error loading sessions: {error.message}</Typography>;
  if (!sessions) return <Typography>Loading sessions...</Typography>;

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(243,244,246,1) 0%, rgba(226,232,240,1) 100%)",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#3f51b5" }}>
          Study Sessions
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
          <TextField
            label="Search by Topic"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              label="Sort By"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Start Time (Ascending)</MenuItem>
              <MenuItem value="desc">Start Time (Descending)</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={() => handleOpenDialog()}
            sx={{ backgroundColor: "#3f51b5" }}
          >
            Add Study Session
          </Button>
        </Box>
      </Box>

      {/* Sessions Grid */}
      <Grid container spacing={3}>
        {filteredSessions.map((session) => (
          <Grid item xs={12} sm={6} md={4} key={session.id}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, position: "relative" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#3f51b5" }}>
                    {session.topic}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(session.startTime).toLocaleString()} -{" "}
                    {new Date(session.endTime).toLocaleString()}
                  </Typography>
                  {session.location && (
                    <Typography variant="body2">
                      Location: {session.location}
                    </Typography>
                  )}
                  {session.notes && (
                    <Typography variant="body2" color="text.secondary">
                      Notes: {session.notes}
                    </Typography>
                  )}
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <IconButton size="small" onClick={() => handleOpenDialog(session)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(session.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Create / Edit Session Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingSession ? "Edit Study Session" : "Add New Study Session"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Topic"
            fullWidth
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            margin="normal"
          />
          <TextField
            label="End Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Location"
            fullWidth
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#3f51b5" }}>
            {editingSession ? "Update Session" : "Create Session"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
