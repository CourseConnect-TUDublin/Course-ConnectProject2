// src/app/(protected)/layout.js
"use client";
import React from "react";
import ConditionalSidebar from "../../components/ConditionalSidebar";
import Header from "../../components/Header";
import { CssBaseline, Box, Drawer, Toolbar } from "@mui/material";

const drawerWidth = 240;

export default function ProtectedLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          ml: `${drawerWidth}px`,
        }}
      >
        <Header drawerWidth={drawerWidth} />
        <Toolbar />
        {children}
      </Box>
    </div>
  );
}
