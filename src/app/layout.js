"use client";

import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Drawer,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import Header from "@/components/Header"; // Your header component
import Sidebar from "@/components/Sidebar"; // Your sidebar component (or ConditionalSidebar)
import SplashScreen from "@/components/SplashScreen";

const drawerWidth = 260; // Adjust sidebar width as needed

export default function RootLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CssBaseline />
          <SplashScreen>
            <Box
              sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#f4f4f4",
              }}
            >
              {/* Sidebar */}
              <Box component="nav">
                {/* Mobile: Temporary Drawer */}
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{ keepMounted: true }}
                  sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      boxSizing: "border-box",
                      backgroundColor: "#ffffff",
                      borderRight: "1px solid #e0e0e0",
                    },
                  }}
                >
                  <Toolbar />
                  <Sidebar />
                </Drawer>
                {/* Desktop: Permanent Drawer */}
                <Drawer
                  variant="permanent"
                  sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      boxSizing: "border-box",
                      backgroundColor: "#ffffff",
                      borderRight: "1px solid #e0e0e0",
                      boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
                    },
                  }}
                  open
                >
                  <Toolbar />
                  <Sidebar />
                </Drawer>
              </Box>

              {/* Main Content */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: { xs: 2, sm: 3, md: 4 },
                  width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
                }}
              >
                {/* Header Area */}
                <AppBar
                  position="fixed"
                  sx={{
                    width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "none",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ mr: 2, display: { md: "none" } }}
                    >
                      <Menu />
                    </IconButton>
                    <Header />
                  </Toolbar>
                </AppBar>
                <Toolbar />

                {/* Fluid Container for Page Content */}
                <Container
                  maxWidth={false}
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    px: { xs: 2, sm: 4, md: 6 },
                    py: { xs: 3, sm: 4 },
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
                    mt: 2,
                  }}
                >
                  {children}
                </Container>
              </Box>
            </Box>
          </SplashScreen>
        </SessionProvider>
      </body>
    </html>
  );
}
