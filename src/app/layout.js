// src/app/layout.js
import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import Header from "../components/Header";
import SplashScreen from "../components/SplashScreen";
import { CssBaseline, Box, Toolbar } from "@mui/material";

export const metadata = {
  title: "Course Connect",
  description: "Modern Course Connect Application",
};

// Export viewport settings separately
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <CssBaseline />
          <SplashScreen>
            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <Header />
              <Toolbar />
              {children}
            </Box>
          </SplashScreen>
        </ClientProviders>
      </body>
    </html>
  );
}
