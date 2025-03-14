"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemText,
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
  AccountCircle,
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
  const { data: session } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobilePopoverAnchor, setMobilePopoverAnchor] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // If no session, do not render anything
  if (!session) return null;

  // --------------------
  // Desktop: original sidebar with hover popovers for subItems
  // --------------------
  const sidebarContent = (
    <List>
      {sidebarItems.map((item) => (
        <ListItem
          key={item.label}
          disablePadding
          onMouseEnter={(e) => !isMobile && item.subItems && handleMouseEnter(e, item)}
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
              onClick={() => isMobile && setDrawerOpen(false)} // close drawer on mobile after click
            >
              {item.label}
            </Button>
          </Link>
          {item.subItems && activeItem?.label === item.label && !isMobile && (
            <Popover
              open={Boolean(mobilePopoverAnchor)}
              anchorEl={mobilePopoverAnchor}
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
                onMouseEnter: () => setMobilePopoverAnchor(mobilePopoverAnchor),
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

  // Only needed for desktop popovers
  const handleMouseEnter = (event, item) => {
    if (item.subItems) {
      setMobilePopoverAnchor(event.currentTarget);
      setActiveItem(item);
    }
  };

  const handleMouseLeave = () => {
    setMobilePopoverAnchor(null);
    setActiveItem(null);
  };

  // --------------------
  // Mobile: Bottom Navigation and Profile-Triggered Drawer
  // --------------------
  if (!isMobile) {
    return <Box sx={{ width: 250 }}>{sidebarContent}</Box>;
  }

  // Define the essential items for bottom navigation.
  // We use the first three items and add a "Profile" button to trigger the extra items drawer.
  const bottomNavItems = [
    { label: "Home", route: "/home", icon: <Home /> },
    { label: "Dashboard", route: "/dashboard", icon: <DashboardIcon /> },
    { label: "Task Manager", route: "/TaskManager", icon: <ListIcon /> },
    { label: "Profile", route: "#", icon: <AccountCircle /> },
  ];

  // Extra items: all sidebar items except the ones used in bottom nav.
  const extraItems = sidebarItems.filter(
    (item) => !["Home", "Dashboard", "Task Manager"].includes(item.label)
  );

  return (
    <>
      {/* Bottom Navigation Bar */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "10px 0",
          zIndex: 1300,
        }}
      >
        {bottomNavItems.map((item) =>
          item.label === "Profile" ? (
            <IconButton key={item.label} onClick={() => setDrawerOpen(true)}>
              {item.icon}
            </IconButton>
          ) : (
            <Link key={item.label} href={item.route} passHref legacyBehavior>
              <IconButton>{item.icon}</IconButton>
            </Link>
          )
        )}
      </Box>

      {/* Drawer that appears when Profile is clicked */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {extraItems.map((item) =>
              item.subItems ? (
                <React.Fragment key={item.label}>
                  <ListItem>
                    {item.icon}
                    <ListItemText primary={item.label} />
                  </ListItem>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      key={subItem.label}
                      button
                      component={Link}
                      href={subItem.route}
                      onClick={() => setDrawerOpen(false)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subItem.label} />
                    </ListItem>
                  ))}
                </React.Fragment>
              ) : (
                <ListItem
                  key={item.label}
                  button
                  component={Link}
                  href={item.route}
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.icon}
                  <ListItemText primary={item.label} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
