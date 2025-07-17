import DashboardScreen from "@/components/DashboardScreen";
import React from "react";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return <DashboardScreen router={router} />;
}
