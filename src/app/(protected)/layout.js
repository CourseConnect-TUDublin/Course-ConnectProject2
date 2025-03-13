"use client";
import React, { useState } from "react";
import ConditionalSidebar from "../../components/ConditionalSidebar";
import Header from "../../components/Header";
import {
  CssBaseline,
  Box,
  Drawer,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";

const drawerWidth = 240;

export default function ProtectedLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      {isMobile ? (
        <>
          {/* Mobile: temporary drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRight: "1px solid #eaeaea",
              },
            }}
          >
            <Toolbar />
            <ConditionalSidebar />
          </Drawer>
          {/* Hamburger icon */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: theme.zIndex.drawer + 1,
            }}
          >
            <Menu />
          </IconButton>
        </>
      ) : (
        // Desktop: permanent drawer
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRight: "1px solid #eaeaea",
            },
          }}
        >
          <Toolbar />
          <ConditionalSidebar />
        </Drawer>
      )}
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          ml: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin 0.3s ease",
        }}
      >
        {/* Pass 0 as drawerWidth to Header on mobile if necessary */}
        <Header drawerWidth={isMobile ? 0 : drawerWidth} />
        <Toolbar />
        {children}
      </Box>
    </div>
  );
}
