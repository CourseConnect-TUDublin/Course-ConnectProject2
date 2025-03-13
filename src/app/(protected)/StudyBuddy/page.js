"use client";

import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import StudyBuddyList from ".//../../../components/StudyBuddyList";
import { motion } from "framer-motion";

export default function StudyBuddyPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        background: "linear-gradient(135deg, #fceabb, #f8b500)",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Header Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 8,
              mb: 4,
              backgroundColor: "#fff8e1",
              border: "2px dashed #ff9800",
            }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#ff5722",
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
              }}
            >
              Study Buddy
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: 500, color: "#8e24aa" }}
            >
              Connect, Collaborate, and Excel Together!
            </Typography>
          </Paper>
        </motion.div>

        {/* List Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 8,
              backgroundColor: "#e1f5fe",
              border: "2px solid #90caf9",
            }}
          >
            <StudyBuddyList />
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
  );
}
