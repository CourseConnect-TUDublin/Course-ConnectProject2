"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const StudySessionForm = ({ onSessionCreated }) => {
  const { data: session } = useSession();
  const [sessionData, setSessionData] = useState({
    subject: "",
    date: null,
    time: null,
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSessionData({ ...sessionData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setSessionData({ ...sessionData, date: newDate });
  };

  const handleTimeChange = (newTime) => {
    setSessionData({ ...sessionData, time: newTime });
  };

  const handleSubmit = async () => {
    if (!session) {
      toast.error("You must be logged in to create a session");
      return;
    }

    if (!sessionData.subject || !sessionData.date || !sessionData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Combine the date and time into a valid Date object.
    const date = sessionData.date;
    const time = sessionData.time;
    const start = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    if (isNaN(start.getTime())) {
      toast.error("Invalid date or time selected");
      return;
    }

    // Set a default duration of 1 hour for the session.
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const userId = session.user.id || session.user.sub;

    const payload = {
      subject: sessionData.subject,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      location: sessionData.location,
      message: sessionData.message,
      tutor: userId,
      student: userId,
    };

    setLoading(true);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Study session created successfully!");
        // Reset the form fields.
        setSessionData({
          subject: "",
          date: null,
          time: null,
          location: "",
          message: "",
        });
        // Trigger parent callback to refresh the study sessions list.
        if (onSessionCreated) onSessionCreated();
      } else {
        toast.error("Failed to create session: " + data.error);
      }
    } catch (error) {
      toast.error("Error creating session");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create a Study Session
      </Typography>
      <TextField
        fullWidth
        name="subject"
        label="Subject"
        variant="outlined"
        value={sessionData.subject}
        onChange={handleChange}
        sx={{ mb: 2 }}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={sessionData.date}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth sx={{ mb: 2 }} required />
          )}
        />
        <TimePicker
          label="Select Time"
          value={sessionData.time}
          onChange={handleTimeChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth sx={{ mb: 2 }} required />
          )}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        name="location"
        label="Location (or Online Link)"
        variant="outlined"
        value={sessionData.location}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="message"
        label="Additional Message"
        variant="outlined"
        multiline
        rows={3}
        value={sessionData.message}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Session"}
      </Button>
    </Paper>
  );
};

export default StudySessionForm;
