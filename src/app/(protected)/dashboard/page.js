"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Search, Notifications } from "@mui/icons-material";
import { useSession, signOut } from "next-auth/react";
import CalendarWidget from "../../../components/CalendarWidget";
import UrgentTasks from "../../../components/UrgentTasks";
import { motion } from "framer-motion";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function CourseConnectDashboard() {
  const { data: session, status } = useSession();

  // Timetable state for CalendarWidget
  const [timetable, setTimetable] = useState([]);
  const [refresh, setRefresh] = useState(Date.now());

  const fetchTimetable = useCallback(async () => {
    try {
      const userId = session?.user?.id || session?.user?.sub;
      const res = await fetch(`/api/timetable?userId=${userId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTimetable(data.data);
        setRefresh(Date.now());
      } else {
        console.error("Error fetching timetable:", data.error);
        setTimetable([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setTimetable([]);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchTimetable();
    }
  }, [session, fetchTimetable]);

  // Display user's name; fallback to email if name is missing
  const userName = session?.user?.name || session?.user?.email || "Guest";

  return (
    <ProtectedRoute>
      {status === "loading" ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
            <CssBaseline />
            {/* Top Navigation */}
            <AppBar
              position="fixed"
              elevation={0}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                color: "#000000",
                borderBottom: "1px solid #eaeaea",
              }}
            >
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Course Connect
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton color="inherit">
                    <Search />
                  </IconButton>
                  <IconButton color="inherit">
                    <Notifications />
                  </IconButton>
                  <Typography variant="body1" sx={{ ml: 2, fontWeight: 500 }}>
                    {userName}
                  </Typography>
                  <Button
                    color="secondary"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    sx={{ ml: 2, textTransform: "none" }}
                  >
                    Sign Out
                  </Button>
                </Box>
              </Toolbar>
            </AppBar>
            <Toolbar />

            {/* Main Content Container */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "1400px", // Increased maxWidth to give more space on larger screens
                mx: "auto",
                px: { xs: 2, sm: 3 },
                py: { xs: 3, sm: 4 },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  mb: 1,
                  fontSize: { xs: "1.75rem", sm: "2.125rem" },
                }}
              >
                Welcome, {userName}!
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: { xs: 2, sm: 3 },
                  color: "#666666",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Here is your agenda for today
              </Typography>

              {/* Widget Grid */}
              <Grid container spacing={4}>
                {/* Urgent Tasks Widget */}
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: { xs: 3, sm: 4 },
                      borderRadius: 2,
                      backgroundColor: "#ffe6e6",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": { transform: "translateY(-4px)", boxShadow: 8 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        px: 1,
                        py: 0.5,
                        backgroundColor: "#ffcccc",
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#b71c1c" }}
                      >
                        Urgent Tasks
                      </Typography>
                    </Box>
                    <UrgentTasks />
                  </Paper>
                </Grid>
                {/* Weekly Calendar Widget */}
                <Grid item xs={12} md={8}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: { xs: 3, sm: 4 },
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": { transform: "translateY(-4px)", boxShadow: 8 },
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        letterSpacing: "-0.25px",
                        color: "#333333",
                        fontSize: { xs: "1.125rem", sm: "1.5rem" },
                      }}
                    >
                      Weekly Calendar
                    </Typography>
                    <CalendarWidget
                      events={Array.isArray(timetable) ? timetable : []}
                      refresh={refresh}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </motion.div>
      )}
    </ProtectedRoute>
  );
}
