"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const StudySessions = ({ refresh }) => {
  const router = useRouter();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define fetchSessions using useCallback to ensure stability.
  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching sessions with refresh:", refresh);
      const res = await fetch("/api/sessions", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        console.log("Fetched sessions:", data.data);
        setSessions(data.data);
      } else {
        console.error("Error fetching sessions:", data.error);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  if (loading) return <Typography>Loading study sessions...</Typography>;

  return (
    <Box>
      {sessions.length === 0 ? (
        <Typography>No study sessions found.</Typography>
      ) : (
        sessions.map((session, index) => (
          <motion.div
            key={session._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              sx={{
                mb: 2,
                boxShadow: 2,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {session.subject || "Study Session"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {new Date(session.startTime).toLocaleString()} -{" "}
                  {new Date(session.endTime).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, textTransform: "none" }}
                  onClick={() => router.push(`/session/${session._id}`)}
                >
                  Join Session
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </Box>
  );
};

export default StudySessions;
