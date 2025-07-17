import OnboardingScreen from "@/components/OnboardingScreen";
import { router } from "expo-router";
import React from "react";

export default function Onboarding() {
  const handleGetStarted = () => {
    router.push("/(auth)/signup");
  };

  const handleLogIn = () => {
    router.push("/(auth)/login");
  };

  return (
    <OnboardingScreen onGetStarted={handleGetStarted} onLogIn={handleLogIn} />
  );
}
