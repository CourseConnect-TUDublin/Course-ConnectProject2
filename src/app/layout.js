"use client";

import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import Header from "../components/Header";
import SplashScreen from "../components/SplashScreen";
import { CssBaseline, Box, Toolbar, Drawer, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const drawerWidth = 240;

export default function RootLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Sidebar content (using Header here, adjust if you have a separate sidebar component)
  const sidebarContent = (
    <>
      <Toolbar />
      <Header />
    </>
  );

  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <CssBaseline />
          <SplashScreen>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              {isMobile ? (
                <>
                  {/* Temporary drawer overlays the content on mobile */}
                  <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                      "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#ffffff",
                        borderRight: "1px solid #eaeaea",
                      },
                    }}
                  >
                    {sidebarContent}
                  </Drawer>
                  {/* Hamburger menu icon */}
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
                // Permanent drawer on larger screens
                <Drawer
                  variant="permanent"
                  open
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      boxSizing: "border-box",
                      backgroundColor: "#ffffff",
                      borderRight: "1px solid #eaeaea",
                    },
                  }}
                >
                  {sidebarContent}
                </Drawer>
              )}
              {/* Main content area */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: { xs: 2, sm: 3, md: 4 },
                  ml: isMobile ? 0 : `${drawerWidth}px`, // No left margin on mobile
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
