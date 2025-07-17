import { Stack } from "expo-router";

export default function OnboardingController() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="goals" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="ai-guide" />
    </Stack>
  );
}
