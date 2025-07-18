import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SquadaOne_400Regular } from "@expo-google-fonts/squada-one";
import "react-native-reanimated";
import { SessionProvider, useSession } from "../session/ctx";
import SplashScreenController from "../splash";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SquadaOne_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { session } = useSession();

  console.log("Session in RootNavigator:", session);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={session === null}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={session !== null}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
    </Stack>
  );
}
