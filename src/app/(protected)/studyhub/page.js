"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  Divider,
  Button,
} from "@mui/material";
import StudyBuddyList from "../../../components/StudyBuddyList";
import Chat from "../../../components/Chat";
import RecommendedBuddies from "../../../components/RecommendedBuddies";
import SessionRequestsOverview from "../../../components/SessionRequestsOverview";
import CalendarWidget from "../../../components/CalendarWidget";
import StudySessions from "../../../components/StudySessions";
import StudySessionForm from "../../../components/StudySessionForm";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function StudyHub() {
  const { data: session } = useSession();
  const currentUser = session?.user?.name || "Guest";

  // State to trigger refresh for the StudySessions component when a new session is created.
  const [refreshSessions, setRefreshSessions] = useState(Date.now());

  // Callback triggered when a new session is created.
  const handleSessionCreated = () => {
    const newRefresh = Date.now();
    console.log("New session created, refreshing study sessions:", newRefresh);
    setRefreshSessions(newRefresh);
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
          sx={{ fontWeight: "bold", mb: 2, color: "#3f51b5" }}
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
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <StudySessionForm onSessionCreated={handleSessionCreated} />
            </Paper>
          </Grid>

          <Divider sx={{ width: "100%", my: 3 }} />

          {/* All Study Buddies Section */}
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Paper
                sx={{
                  p: { xs: 2, sm: 3 },
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
            </motion.div>
          </Grid>

          {/* Recommended Study Buddies Section */}
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Paper
                sx={{
                  p: { xs: 2, sm: 3 },
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
            </motion.div>
          </Grid>

          {/* Session Requests Overview Section */}
          <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Paper
                sx={{
                  p: { xs: 2, sm: 3 },
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
            </motion.div>
          </Grid>

          {/* Study Sessions Section */}
          <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Paper
                sx={{
                  p: { xs: 2, sm: 3 },
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
                <StudySessions refresh={refreshSessions} key={refreshSessions} />
              </Paper>
            </motion.div>
          </Grid>

          {/* Group Study Chat Room Section */}
          <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Paper
                sx={{
                  p: { xs: 2, sm: 3 },
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
            </motion.div>
          </Grid>

          {/* Upcoming Sessions & Events Section */}
          <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Paper
                sx={{
                  p: { xs: 2, sm: 3 },
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
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}
