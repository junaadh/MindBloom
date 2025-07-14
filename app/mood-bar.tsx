import MoodBarScreen from "@/components/MoodBarScreen";
import { router } from "expo-router";
import React from "react";

export default function MoodBar() {
  const handleContinue = (mood: string) => {
    // TODO: Handle mood selection and navigate to next screen
    console.log("Mood selected:", mood);
    router.push("/dashboard");
  };

  return <MoodBarScreen onContinue={handleContinue} />;
}
