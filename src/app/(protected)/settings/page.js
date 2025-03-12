"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    timezone: "UTC",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    frequency: "immediate",
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
  });

  // Handlers for profile settings
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for notification settings
  const handleNotificationSwitch = (e) => {
    setNotifications((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleNotificationFrequency = (e) => {
    setNotifications((prev) => ({ ...prev, frequency: e.target.value }));
  };

  // Handlers for appearance settings
  const handleAppearanceSwitch = (e) => {
    setAppearance((prev) => ({ ...prev, darkMode: e.target.checked }));
  };

  const handleSave = () => {
    // This is where you could send the updated settings to an API.
    alert(
      `Settings Saved!
Profile: ${JSON.stringify(profile, null, 2)}
Notifications: ${JSON.stringify(notifications, null, 2)}
Appearance: ${JSON.stringify(appearance, null, 2)}`
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Settings
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Profile & Account
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            fullWidth
          />
          <TextField
            label="Timezone"
            name="timezone"
            value={profile.timezone}
            onChange={handleProfileChange}
            fullWidth
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notification Preferences
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                name="email"
                checked={notifications.email}
                onChange={handleNotificationSwitch}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                name="push"
                checked={notifications.push}
                onChange={handleNotificationSwitch}
              />
            }
            label="Push Notifications"
          />
          <FormControl fullWidth>
            <InputLabel>Notification Frequency</InputLabel>
            <Select
              value={notifications.frequency}
              label="Notification Frequency"
              onChange={handleNotificationFrequency}
            >
              <MenuItem value="immediate">Immediate</MenuItem>
              <MenuItem value="daily">Daily Summary</MenuItem>
              <MenuItem value="weekly">Weekly Summary</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Appearance
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={appearance.darkMode}
                onChange={handleAppearanceSwitch}
              />
            }
            label="Enable Dark Mode"
          />
        </Box>
      </Paper>

      <Button variant="contained" onClick={handleSave} fullWidth>
        Save Settings
      </Button>
    </Container>
  );
}
