"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const StudyBuddyList = () => {
  const router = useRouter();
  const [studyBuddies, setStudyBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudyBuddies = async () => {
      try {
        const res = await fetch("/api/studybuddies");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setStudyBuddies(data);
      } catch (err) {
        console.error("Error fetching study buddies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyBuddies();
  }, []);

  if (loading)
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        Loading study buddies...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body1" color="error" sx={{ mt: 2 }}>
        Error: {error}
      </Typography>
    );

  // Filter study buddies based on the search term (by name or subjects)
  const filteredBuddies = studyBuddies.filter((buddy) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const nameMatches = buddy.name.toLowerCase().includes(lowerCaseTerm);
    const subjectsMatches =
      buddy.subjects &&
      buddy.subjects.join(" ").toLowerCase().includes(lowerCaseTerm);
    return nameMatches || subjectsMatches;
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Study Buddies
      </Typography>
      <TextField
        label="Search buddies"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      {filteredBuddies.length === 0 ? (
        <Typography variant="body1">No study buddies found.</Typography>
      ) : (
        filteredBuddies.map((buddy, idx) => (
          <motion.div
            key={buddy._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card
              sx={{
                mb: 2,
                boxShadow: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {buddy.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Subjects:</strong>{" "}
                  {buddy.subjects && buddy.subjects.length > 0
                    ? buddy.subjects.join(", ")
                    : "Not specified"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Learning Style:</strong>{" "}
                  {buddy.learningStyle || "Not specified"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Availability:</strong>{" "}
                  {buddy.availability && buddy.availability.length > 0
                    ? buddy.availability.join(", ")
                    : "Not specified"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, textTransform: "none" }}
                  onClick={() => router.push(`/StudyBuddy/${buddy._id}`)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </Box>
  );
};

export default StudyBuddyList;
