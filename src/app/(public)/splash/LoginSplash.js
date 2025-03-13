"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function LoginSplash() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect to /dashboard if authenticated.
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0071e3, #005bb5)",
        }}
      >
        <CircularProgress sx={{ color: "#ffffff" }} />
      </Container>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0071e3, #005bb5)",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          backgroundColor: "#ffffff",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2, color: "#0071e3", fontWeight: 700 }}
        >
          Course Connect
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: "#333333" }}>
          Please log in to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            label="Email Address"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#0071e3",
              "&:hover": {
                backgroundColor: "#005bb5",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
