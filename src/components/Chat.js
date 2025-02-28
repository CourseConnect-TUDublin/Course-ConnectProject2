"use client";

import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Box, TextField, Button, Typography } from "@mui/material";

// Connect to the Socket.IO server (adjust URL or settings as needed)
const socket = io();

const Chat = ({ room, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log("Joining room:", room);
    socket.emit("joinRoom", room);

    socket.on("message", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, [room]);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      console.log("Sending message:", input);
      const messageData = {
        room,
        sender: currentUser,
        message: input,
        timestamp: new Date().toISOString(),
      };
      socket.emit("chatMessage", messageData);
      setInput("");
    }
  };

  // Send message on Enter (without Shift)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chat Room
      </Typography>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 1,
          height: 300,
          overflowY: "auto",
          mb: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              mb: 1,
              p: 1,
              borderRadius: 1,
              backgroundColor: msg.sender === currentUser ? "#e0f7fa" : "#ffffff",
            }}
          >
            <Typography variant="subtitle2">
              <strong>{msg.sender}</strong>{" "}
              <Typography component="span" variant="caption" color="text.secondary">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
            </Typography>
            <Typography variant="body2">{msg.message}</Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
