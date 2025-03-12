"use client";

import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import Header from "../components/Header";
import SplashScreen from "../components/SplashScreen";
import { CssBaseline, Box, Toolbar, Drawer, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

export default function RootLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <CssBaseline />
          <SplashScreen>
            <Box sx={{ display: "flex" }}>
              {/* Drawer for collapsible sidebar */}
              <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? drawerOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  width: 240,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderRight: "1px solid #eaeaea",
                  },
                }}
              >
                <Toolbar />
                <Header />
              </Drawer>
              {/* Hamburger Menu for Mobile */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={handleDrawerToggle}
                  sx={{
                    position: "fixed",
                    top: 16,
                    left: 16,
                    zIndex: 1300,
                  }}
                >
                  <Menu />
                </IconButton>
              )}
              {/* Main content area */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: { xs: 2, sm: 3, md: 4 },
                  ml: isMobile ? 0 : "240px", // No left margin on mobile
                  transition: "margin 0.3s ease",
                }}
              >
                <Toolbar />
                {children}
              </Box>
            </Box>
          </SplashScreen>
        </ClientProviders>
      </body>
    </html>
  );
}
