"use client";

import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import { AddCircleOutline, Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

// SWR fetcher function that checks for errors.
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error fetching data");
  }
  return res.json();
};

export default function StudySessionsPage() {
  const { data: session } = useSession();
  const { data: sessions, error } = useSWR("/api/sessions", fetcher, { refreshInterval: 5000 });

  // Local state for modal dialog and form data.
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [formData, setFormData] = useState({
    topic: "",
    startTime: "",
    endTime: "",
    location: "",
    notes: "",
    student: "",
  });

  // Auto-populate student field once the session is available.
  useEffect(() => {
    if (session && session.user && session.user.id) {
      setFormData((prev) => ({ ...prev, student: session.user.id }));
    }
  }, [session]);

  // Open the create/edit dialog.
  const handleOpenDialog = (sessionData = null) => {
    if (sessionData) {
      setEditingSession(sessionData);
      setFormData({
        topic: sessionData.topic || "",
        startTime: sessionData.startTime
          ? new Date(sessionData.startTime).toISOString().slice(0, 16)
          : "",
        endTime: sessionData.endTime
          ? new Date(sessionData.endTime).toISOString().slice(0, 16)
          : "",
        location: sessionData.location || "",
        notes: sessionData.notes || "",
        student: sessionData.student || (session?.user?.id || ""),
      });
    } else {
      setEditingSession(null);
      setFormData({
        topic: "",
        startTime: "",
        endTime: "",
        location: "",
        notes: "",
        student: session?.user?.id || "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSession(null);
    setFormData({
      topic: "",
      startTime: "",
      endTime: "",
      location: "",
      notes: "",
      student: session?.user?.id || "",
    });
  };

  // Validate that endTime is after startTime.
  const isValidTimeRange = (start, end) => new Date(end) > new Date(start);

  const handleSubmit = async () => {
    if (!formData.topic.trim() || !formData.startTime || !formData.endTime) {
      toast.error("Topic, Start Time, and End Time are required.");
      return;
    }
    if (!isValidTimeRange(formData.startTime, formData.endTime)) {
      toast.error("End Time must be after Start Time.");
      return;
    }
    const payload = {
      student: formData.student,
      topic: formData.topic,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
      location: formData.location,
      notes: formData.notes,
    };

    try {
      let res;
      if (editingSession) {
        // Update an existing session.
        res = await fetch(`/api/sessions?id=${editingSession.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create a new session.
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
      mutate("/api/sessions");
      handleCloseDialog();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(error.message);
    }
  };

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
      console.error("Error in handleDelete:", error);
      toast.error(error.message);
    }
  };

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error loading sessions: {error.message}
      </Typography>
    );
  }

  if (!sessions) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        background: "linear-gradient(135deg, #f3f4f6, #e2e8f0)",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
          My Study Sessions
        </Typography>
        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => handleOpenDialog()}>
          Create Session
        </Button>
      </Box>

      <Grid container spacing={3}>
        {sessions.map((sessionData) => (
          <Grid item xs={12} sm={6} md={4} key={sessionData.id}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2, position: "relative" }}>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
                  {sessionData.topic}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {new Date(sessionData.startTime).toLocaleString()} - {new Date(sessionData.endTime).toLocaleString()}
                </Typography>
                {sessionData.location && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {sessionData.location}
                  </Typography>
                )}
                {sessionData.notes && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Notes:</strong> {sessionData.notes}
                  </Typography>
                )}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Tooltip title="Edit Session">
                    <IconButton size="small" onClick={() => handleOpenDialog(sessionData)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Session">
                    <IconButton size="small" onClick={() => handleDelete(sessionData.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Create / Edit Session Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Fade}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editingSession ? "Edit Study Session" : "Create New Study Session"}
        </DialogTitle>
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
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSession ? "Update Session" : "Create Session"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
