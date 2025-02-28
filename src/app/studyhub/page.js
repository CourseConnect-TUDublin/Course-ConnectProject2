"use client";

import React, { useState } from "react";
import { Box, Grid, Paper, Typography, Container } from "@mui/material";
import StudyBuddyList from "../../components/StudyBuddyList";
import Chat from "../../components/Chat";
import RecommendedBuddies from "../../components/RecommendedBuddies";
import SessionRequestsOverview from "../../components/SessionRequestsOverview";
import CalendarWidget from "../../components/CalendarWidget";
import StudySessions from "../../components/StudySessions";
import StudySessionForm from "../../components/StudySessionForm";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function StudyHub() {
  const { data: session } = useSession();
  const currentUser = session?.user?.name || "Guest";
  // Refresh state for updating the StudySessions component when a new session is created.
  const [refreshSessions, setRefreshSessions] = useState(Date.now());

  // Callback to trigger a refresh when a new session is created.
  const handleSessionCreated = () => {
    setRefreshSessions(Date.now());
  };

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
        >
          Study Hub
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, color: "#555" }}>
          Your one-stop hub for study-related activities: connect with study
          buddies, manage sessions, join live chats, and more.
        </Typography>

        <Grid container spacing={3}>
          {/* Create Study Session Section */}
          <Grid item xs={12}>
            <StudySessionForm onSessionCreated={handleSessionCreated} />
          </Grid>

          {/* All Study Buddies Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#3f51b5", mb: 2 }}
              >
                All Study Buddies
              </Typography>
              <StudyBuddyList />
            </Paper>
          </Grid>

          {/* Recommended Study Buddies Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#3f51b5", mb: 2 }}
              >
                Recommended for You
              </Typography>
              <RecommendedBuddies currentUser={session?.user} />
            </Paper>
          </Grid>

          {/* Session Requests Overview Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#3f51b5", mb: 2 }}
              >
                Session Requests
              </Typography>
              <SessionRequestsOverview currentUser={session?.user} />
            </Paper>
          </Grid>

          {/* Study Sessions Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#3f51b5", mb: 2 }}
              >
                Study Sessions
              </Typography>
              <StudySessions refresh={refreshSessions} />
            </Paper>
          </Grid>

          {/* Group Study Chat Room Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#3f51b5", mb: 2 }}
              >
                Group Study Chat Room
              </Typography>
              <Chat room="studyhub-chat" currentUser={currentUser} />
            </Paper>
          </Grid>

          {/* Upcoming Sessions & Events Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#3f51b5", mb: 2 }}
              >
                Upcoming Sessions & Events
              </Typography>
              <CalendarWidget />
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}
