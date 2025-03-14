"use client";

import React from "react";
import {
  Box,
  Typography,
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

  // Colors to alternate backgrounds for cards
  const cardColors = ["#e3f2fd", "#fce4ec", "#e8f5e9", "#fff3e0"];

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
            backgroundColor: "#0071e3",
            color: "#ffffff",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src="/course-connect-logo.svg"
                alt="Course Connect Logo"
                sx={{ width: 50, mr: 1 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Course Connect
              </Typography>
            </Box>
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

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ textAlign: "center", color: "#ffffff", mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Welcome, {userName}!
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Explore your tools below
            </Typography>
          </Box>

          {/* Vertical Card List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {toolItems.map((tool, index) => (
              <Link key={tool.label} href={tool.route} legacyBehavior>
                <a style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
                  >
                    <Paper
                      elevation={6}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: cardColors[index % cardColors.length],
                        cursor: "pointer",
                        minHeight: "100px",
                      }}
                    >
                      <Box sx={{ mr: 3, color: "#0071e3", display: "flex", alignItems: "center" }}>
                        {tool.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
                          {tool.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quick preview of {tool.label}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </a>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}
