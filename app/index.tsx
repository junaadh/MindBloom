import SplashScreen from "@/components/SplashScreen";
import { SquadaOne_400Regular, useFonts } from "@expo-google-fonts/squada-one";
import { router } from "expo-router";
import React, { useEffect } from "react";

export default function Index() {
  let [fontsLoaded] = useFonts({
    SquadaOne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Show onboarding screen after 500ms delay
      const timer = setTimeout(() => {
        router.push("/onboarding");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return loading state while fonts load
  }

  return <SplashScreen />;
}
