"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useSession } from "next-auth/react";

export default function SplashScreen({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // User is logged in; skip splash and go to dashboard.
      setShowSplash(false);
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      // User is not logged in; show splash for 5 seconds then redirect to login.
      const timer = setTimeout(() => {
        setShowSplash(false);
        router.push("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [router, status]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            {/* Larger Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }}
              style={{ marginBottom: 20 }}
            >
              <Box
                component="img"
                src="/course-connect-logo.svg"
                alt="Course Connect Logo"
                sx={{ width: 300, height: "auto" }}
              />
            </motion.div>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 1 } }}
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Connecting Courses to Students
            </motion.div>

            {/* Loading Spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 3, duration: 1 } }}
              style={{ marginTop: "30px" }}
            >
              <CircularProgress size={60} style={{ color: "#ffffff" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render main content after splash */}
      <div style={{ display: showSplash ? "none" : "block" }}>
        {children}
      </div>
    </>
  );
}
