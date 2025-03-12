"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3f51b5, #1a237e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        maxWidth="sm"
      >
        <Card sx={{ p: 3, boxShadow: 6, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Create an Account
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>
            </Box>

            <Typography variant="body2" align="center" sx={{ mt: 2, mb: 1 }}>
              Or sign up with:
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1, textTransform: "none" }}
              onClick={() => signIn("google")}
            >
              Sign up with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1, textTransform: "none" }}
              onClick={() => signIn("apple")}
            >
              Sign up with Apple
            </Button>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <MuiLink href="/login" variant="body2">
                Already have an account? Login
              </MuiLink>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
