import DashboardScreen from "@/components/DashboardScreen";
import React from "react";
import { TabType } from "@/components/TaskBar";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  const handleTabPress = (tab: TabType) => {
    console.log("Tab pressed:", tab);

    switch (tab) {
      case "home":
        // Already on home/dashboard
        break;
      case "explore":
        // TODO: Navigate to explore screen
        console.log("Navigate to explore");
        break;
      case "journal":
        router.push("/journal");
        break;
      case "profile":
        // TODO: Navigate to profile screen
        console.log("Navigate to profile");
        break;
    }
  };

  return <DashboardScreen onTabPress={handleTabPress} router={router} />;
}
