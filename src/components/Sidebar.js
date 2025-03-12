"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  List,
  ListItem,
  Button,
  Popover,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  Home,
  Dashboard as DashboardIcon,
  Assignment,
  CalendarToday,
  People,
  Help,
  Settings,
  Archive as ArchiveIcon,
  List as ListIcon,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";

const sidebarItems = [
  { label: "Home", route: "/home", icon: <Home /> },
  { label: "Dashboard", route: "/dashboard", icon: <DashboardIcon /> },
  { label: "Task Manager", route: "/TaskManager", icon: <ListIcon /> },
  { label: "Goal Tracker", route: "/goal-tracker", icon: <Assignment /> },
  { label: "Timetable", route: "/timetable", icon: <CalendarToday /> },
  { label: "Study Hub", route: "/studyhub", icon: <People /> },
  {
    label: "Study Tools",
    route: "/studyhub",
    icon: <People />,
    subItems: [
      { label: "Study Buddy", route: "/StudyBuddy" },
      { label: "Chat Room", route: "/chatroom" },
      { label: "Calendar", route: "/calendar" },
      { label: "Study Sessions", route: "/study-sessions" },
    ],
  },
  { label: "Help Center", route: "/helpcenter", icon: <Help /> },
  { label: "Settings", route: "/settings", icon: <Settings /> },
  { label: "Archive", route: "/TaskManager/archive", icon: <ArchiveIcon /> },
];

export default function Sidebar() {
  // Always call hooks at the top level
  const { data: session } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // If no session, do not render anything
  if (!session) return null;

  const handleMouseEnter = (event, item) => {
    if (item.subItems) {
      setAnchorEl(event.currentTarget);
      setActiveItem(item);
    }
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setActiveItem(null);
  };

  const open = Boolean(anchorEl);

  // Sidebar content: extracted to reuse in Drawer (mobile) and permanent (desktop)
  const sidebarContent = (
    <List>
      {sidebarItems.map((item) => (
        <ListItem
          key={item.label}
          disablePadding
          onMouseEnter={(e) => !isMobile && handleMouseEnter(e, item)}
          onMouseLeave={() => !isMobile && handleMouseLeave()}
        >
          <Link href={item.route} passHref legacyBehavior>
            <Button
              startIcon={item.icon}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                color: "inherit",
                padding: "12px 16px",
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => isMobile && setMobileOpen(false)} // close drawer on mobile after click
            >
              {item.label}
            </Button>
          </Link>
          {item.subItems && activeItem?.label === item.label && !isMobile && (
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleMouseLeave}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                onMouseEnter: () => setAnchorEl(anchorEl),
                onMouseLeave: handleMouseLeave,
                sx: { mt: 1 },
              }}
            >
              {item.subItems.map((subItem) => (
                <Link key={subItem.label} href={subItem.route} passHref legacyBehavior>
                  <Button
                    sx={{
                      width: "100%",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      padding: "8px 16px",
                    }}
                  >
                    {subItem.label}
                  </Button>
                </Link>
              ))}
            </Popover>
          )}
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {isMobile ? (
        // On mobile, show a hamburger icon that toggles the drawer
        <>
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
          >
            <ListIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileOpen(false)}>
              {sidebarContent}
            </Box>
          </Drawer>
        </>
      ) : (
        // On desktop, show the sidebar permanently
        <Box sx={{ width: 250 }}>{sidebarContent}</Box>
      )}
    </>
  );
}
