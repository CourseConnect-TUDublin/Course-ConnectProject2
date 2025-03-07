"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
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
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const callbackUrl = "/dashboard"; // Change this to your preferred redirect route

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(result.url || callbackUrl);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#808080", // Grey background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
      }}
    >
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        maxWidth="sm" // Increase container width to "sm" for a larger form
      >
        <Paper
          elevation={10}
          sx={{
            p: 6, // Increase padding for a bigger form
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: "#3f51b5" }}
          >
            Login to Course Connect
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2, mb: 1 }}>
            Or sign in with:
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, mb: 1, textTransform: "none" }}
            onClick={() => signIn("google", { callbackUrl })}
          >
            Sign in with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, mb: 1, textTransform: "none" }}
            onClick={() => signIn("apple", { callbackUrl })}
          >
            Sign in with Apple
          </Button>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <MuiLink href="/forgot-password" variant="body2">
              Forgot password?
            </MuiLink>
            <MuiLink href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </MuiLink>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
