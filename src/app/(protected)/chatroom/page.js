"use client";

import React from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import Chat from "../../../components/Chat";
import { useSession } from "next-auth/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

export default function ChatRoomPage() {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.name || "Guest";

  if (status === "loading") {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography sx={{ textAlign: "center", mt: 4 }}>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 2,
        p: 0,
      }}
    >
      {/* Chat Header */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          borderRadius: "20px 20px 0 0",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Chat Room
        </Typography>
        <Avatar alt={currentUser} src={session?.user?.image || ""} />
      </Paper>

      {/* Chat Content */}
      <Paper
        elevation={3}
        sx={{
          height: "70vh",
          borderRadius: "0 0 20px 20px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
          p: 2,
        }}
      >
        <Chat room="chatroom" currentUser={currentUser} />
      </Paper>

      {/* Chat Input Area (Placeholder) */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Box
          sx={{
            mt: 1,
            p: 1.5,
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e0e0e0",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Chat input area...
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
}
