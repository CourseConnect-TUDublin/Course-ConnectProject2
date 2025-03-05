"use client";

import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import LoginSplash from "../app/splash/LoginSplash"; // Updated import path

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <CircularProgress />;
  if (!session) return <LoginSplash />;

  return children;
}
