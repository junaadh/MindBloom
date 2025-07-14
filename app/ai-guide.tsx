import AIGuidePage from "@/components/AIGuidePage";
import { router } from "expo-router";
import React from "react";

export default function AIGuide() {
  const handleNext = () => {
    // TODO: Navigate to next screen after AI guide
    console.log("Next pressed on AI Guide Page");
    router.push("/mood-bar");
  };

  const handleSkipDemo = () => {
    // TODO: Skip demo and navigate to main app
    console.log("Skip Demo pressed on AI Guide Page");
    router.push("/mood-bar");
  };

  return <AIGuidePage onNext={handleNext} onSkipDemo={handleSkipDemo} />;
}
