"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion } from "framer-motion";
import { format, parseISO, isPast } from "date-fns";

export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    progress: 0,
    target: 100,
    deadline: "",
  });
  const [editGoal, setEditGoal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch goals from API
  useEffect(() => {
    setLoading(true);
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setGoals(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
        setLoading(false);
      });
  }, []);

  const handleOpenDialog = (goal = null) => {
    if (goal) {
      setEditGoal(goal);
      setNewGoal(goal);
    } else {
      setEditGoal(null);
      setNewGoal({
        title: "",
        description: "",
        progress: 0,
        target: 100,
        deadline: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewGoal({
      title: "",
      description: "",
      progress: 0,
      target: 100,
      deadline: "",
    });
  };

  const handleSaveGoal = () => {
    setLoading(true);
    const goalData = { ...newGoal, progress: Number(newGoal.progress) };
    if (editGoal) {
      fetch(`/api/goals/${editGoal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setGoals(goals.map((g) => (g.id === editGoal.id ? goalData : g)));
            handleCloseDialog();
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error saving goal:", error);
          setLoading(false);
        });
    } else {
      fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setGoals([...goals, data.data]);
            handleCloseDialog();
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error creating goal:", error);
          setLoading(false);
        });
    }
  };

  const getDueDateStyle = (dueDate) => {
    const parsedDate = parseISO(dueDate);
    if (isPast(parsedDate)) {
      return { color: "red", fontWeight: "bold" };
    }
    return {};
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: "#f0f0f0" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ color: "#3f51b5", fontWeight: "bold" }}>
          Goal Tracker
        </Typography>
        <EmojiEventsIcon fontSize="large" sx={{ color: "#ff9800", ml: 1 }} />
      </Box>

      <Button
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{
          mb: 3,
          backgroundColor: "#3f51b5",
          "&:hover": { backgroundColor: "#283593" },
        }}
      >
        Add New Goal
      </Button>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "0 auto" }} />
      ) : (
        <Grid container spacing={3}>
          {goals.map((goal) => {
            const progressPercent = Math.round((goal.progress / goal.target) * 100);
            return (
              <Grid item xs={12} sm={6} md={4} key={goal.id}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card
                    sx={{
                      minHeight: 200,
                      backgroundColor: "#ffffff",
                      borderRadius: 2,
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      border: progressPercent === 100 ? "2px solid #4caf50" : "none",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "#3f51b5" }}>
                        {goal.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {goal.description}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={progressPercent}
                            sx={{ height: 10, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ minWidth: 35 }}>
                          {progressPercent}%
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ display: "block" }}>
                        Target: {goal.target} | Progress: {goal.progress}
                      </Typography>
                      <Typography variant="caption" sx={{ ...getDueDateStyle(goal.deadline), display: "block" }}>
                        Due: {format(parseISO(goal.deadline), "MMM dd, yyyy")}
                      </Typography>

                      <Box sx={{ mt: 2, textAlign: "right" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenDialog(goal)}
                          sx={{ textTransform: "none" }}
                        >
                          Edit
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editGoal ? "Edit Goal" : "Add New Goal"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Target"
            fullWidth
            type="number"
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            label="Progress"
            fullWidth
            type="number"
            value={newGoal.progress}
            onChange={(e) => setNewGoal({ ...newGoal, progress: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            label="Deadline"
            type="date"
            fullWidth
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveGoal} variant="contained">
            {editGoal ? "Save Changes" : "Create Goal"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
