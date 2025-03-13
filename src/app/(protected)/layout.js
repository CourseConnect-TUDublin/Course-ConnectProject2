"use client";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

export default function ProtectedLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <SessionProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        {isMobile ? (
          <>
            {/* Mobile: Temporary Sidebar */}
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
            {/* Hamburger Icon */}
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
          // Desktop: Permanent Sidebar
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
            open
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header drawerWidth={isMobile ? 0 : drawerWidth} />
          <Toolbar />
          {children}
        </Box>
      </Box>
    </SessionProvider>
  );
}
