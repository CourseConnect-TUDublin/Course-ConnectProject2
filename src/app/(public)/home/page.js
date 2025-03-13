"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CssBaseline,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Notifications,
  Dashboard as DashboardIcon,
  Assignment,
  CalendarToday,
  CheckBox,
  People,
  Chat,
  Help,
  Settings,
} from "@mui/icons-material";
import { useSession, signOut } from "next-auth/react";

// Define tool items (widgets) for the home overview
const toolItems = [
  { label: "Dashboard", route: "/dashboard", icon: <DashboardIcon fontSize="large" /> },
  { label: "Task Manager", route: "/TaskManager", icon: <Assignment fontSize="large" /> },
  { label: "Timetable", route: "/timetable", icon: <CalendarToday fontSize="large" /> },
  { label: "Assignments", route: "/assignments", icon: <Assignment fontSize="large" /> },
  { label: "To-Do", route: "/todo", icon: <CheckBox fontSize="large" /> },
  { label: "Study Buddy", route: "/StudyBuddy", icon: <People fontSize="large" /> },
  { label: "Chat Room", route: "/chatroom", icon: <Chat fontSize="large" /> },
  { label: "Calendar", route: "/calendar", icon: <CalendarToday fontSize="large" /> },
  { label: "Help Center", route: "/helpcenter", icon: <Help fontSize="large" /> },
  { label: "Settings", route: "/settings", icon: <Settings fontSize="large" /> },
];

export default function HomePage() {
  const { data: session } = useSession();
  const userName = session?.user?.email || "Guest";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #0071e3, #005bb5)",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />

        {/* Top Navigation */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: "100%",
            backgroundColor: "#0071e3", // Solid background instead of transparent
            color: "#ffffff",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
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
                color="inherit"
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Box sx={{ textAlign: "center", color: "#ffffff", mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Welcome, {userName}!
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Explore your tools below
            </Typography>
          </Box>

          {/* Unique & Exciting Widget Grid */}
          <Grid container spacing={4}>
            {toolItems.map((tool) => (
              <Grid
                item
                key={tool.label}
                xs={12}
                sm={6}
                md={tool.label === "Timetable" ? 8 : 4}
              >
                <Link href={tool.route} style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Paper
                      elevation={8}
                      sx={{
                        p: { xs: 4, sm: 5 },
                        borderRadius: 3,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        height: "100%",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Box sx={{ mb: 2, color: "#0071e3" }}>
                        {tool.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 1, color: "#333333" }}
                      >
                        {tool.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quick preview of {tool.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
}
