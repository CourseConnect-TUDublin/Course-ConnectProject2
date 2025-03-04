"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

export default function StudySessions() {
  const [sessions, setSessions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSession, setNewSession] = useState({
    topic: "",
    duration: "", // duration in minutes
    notes: "",
  });

  // Define a stable fetchSessions function using useCallback
  const fetchSessions = useCallback(async () => {
    // Replace this with your real API call if available
    setSessions([
      { id: 1, topic: "Math Revision", duration: 60, notes: "Focus on calculus" },
      { id: 2, topic: "History Reading", duration: 45, notes: "Chapters on WWII" },
    ]);
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSession({ topic: "", duration: "", notes: "" });
  };

  const handleCreateSession = () => {
    const session = { ...newSession, id: Date.now() };
    setSessions([...sessions, session]);
    // Optionally, post the new session to your API here
    handleCloseDialog();
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Study Sessions
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpenDialog}
        startIcon={<AddCircleOutline />}
        sx={{ mb: 2 }}
      >
        Add Study Session
      </Button>
      <Grid container spacing={2}>
        {sessions.map((session) => (
          <Grid item xs={12} sm={6} md={4} key={session.id}>
            <Card sx={{ minHeight: 150 }}>
              <CardContent>
                <Typography variant="h6">{session.topic}</Typography>
                <Typography variant="body2">
                  Duration: {session.duration} minutes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Notes: {session.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Study Session</DialogTitle>
        <DialogContent>
          <TextField
            label="Topic"
            fullWidth
            value={newSession.topic}
            onChange={(e) =>
              setNewSession({ ...newSession, topic: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Duration (minutes)"
            type="number"
            fullWidth
            value={newSession.duration}
            onChange={(e) =>
              setNewSession({ ...newSession, duration: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={3}
            value={newSession.notes}
            onChange={(e) =>
              setNewSession({ ...newSession, notes: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateSession} variant="contained">
            Create Session
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
