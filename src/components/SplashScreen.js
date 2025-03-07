"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgress, Typography } from "@mui/material";

export default function SplashScreen({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push("/login"); // Redirect to login page after 5 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

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
              backgroundColor: "#808080", // Grey background
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 2, ease: "easeOut" } }}
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Course Connect
            </motion.div>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 2.2, duration: 1 } }}
              style={{
                fontSize: "18px",
                color: "#ffffff",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Connecting Courses & Students
            </motion.div>

            {/* Loading Spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 3, duration: 1 } }}
              style={{ marginTop: "20px" }}
            >
              <CircularProgress size={60} style={{ color: "#ffffff" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render main content after splash (for testing, you might hide children during development) */}
      <div style={{ display: showSplash ? "none" : "block" }}>
        {children}
      </div>
    </>
  );
}
