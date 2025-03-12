"use client";

import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import StudyBuddyList from "../../../components/StudyBuddyList";
import { motion } from "framer-motion";

export default function StudyBuddyPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        background: "linear-gradient(135deg, #f3f4f6, #e2e8f0)",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            mb: 4,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#3f51b5" }}
          >
            Study Buddy
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
          >
            Connect, Collaborate, and Excel Together!
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <StudyBuddyList />
        </Paper>
      </motion.div>
    </Container>
  );
}
