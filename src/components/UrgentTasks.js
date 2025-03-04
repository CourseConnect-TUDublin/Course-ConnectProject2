"use client";

import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

export default function UrgentTasks() {
  const [tasks, setTasks] = useState([]);

  // Fetch urgent tasks from your task API
  const fetchUrgentTasks = async () => {
    try {
      const res = await fetch("/api/tasks?urgent=true", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Urgent tasks API response:", data);
      if (data.success && Array.isArray(data.data)) {
        setTasks(data.data);
      } else {
        console.error("Unexpected tasks format:", data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchUrgentTasks();
  }, []);

  // Toggle task completion status using _id as unique identifier
  const handleToggle = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !tasks.find((task) => task._id === taskId)?.completed,
        }),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task from the list using _id as the identifier
  const handleDelete = async (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Urgent Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => handleToggle(task._id)}
              />
              <ListItemText
                primary={task.description}
                secondary={`Due: ${task.dueDate || "N/A"}`}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );
}
