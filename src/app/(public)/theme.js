// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0071e3", // Modern accent color
      contrastText: "#ffffff", // Ensure text is visible on primary
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f4f4f4", // Softer background instead of pure white
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 700,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 700,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#005bb5", // darker shade on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "16px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
