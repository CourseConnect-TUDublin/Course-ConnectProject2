import { Box, Typography } from "@mui/material";

export default function ResponsiveBox() {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "primary.light",
        // Mobile-first default styling
        fontSize: "14px",
        // Increase font size on larger screens
        '@media (min-width:600px)': {
          fontSize: "16px",
        },
        '@media (min-width:900px)': {
          fontSize: "18px",
        },
      }}
    >
      <Typography>
        This text size adjusts based on the viewport width.
      </Typography>
    </Box>
  );
}
