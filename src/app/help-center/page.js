"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function HelpCenterPage() {
  // Example FAQs in state
  const [faqs] = useState([
    {
      question: "How do I reset my password?",
      answer:
        "Go to Settings > Account, and click 'Reset Password'. You’ll receive an email with further instructions.",
    },
    {
      question: "Where can I find user tutorials?",
      answer:
        "Check out our Knowledge Base in the navigation menu for video tutorials and detailed documentation.",
    },
  ]);

  // Example for user-submitted questions
  const [question, setQuestion] = useState("");

  const handleSubmitQuestion = () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }
    // Example: send question to support or store in DB
    alert(`Your question has been submitted:\n${question}`);
    setQuestion("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Help Center
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Ask a Question
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Your Question"
            multiline
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmitQuestion}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
