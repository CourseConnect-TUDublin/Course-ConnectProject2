"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Chat from "../../../components/Chat";
import { useSession } from "next-auth/react";

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Chat Room
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Chat room="chatroom" currentUser={currentUser} />
      </Box>
    </Container>
  );
}
