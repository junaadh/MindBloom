import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SquadaOne_400Regular } from "@expo-google-fonts/squada-one";
import "react-native-reanimated";
import { SessionProvider } from "../session/ctx";
import SplashScreenController from "./splash";

export default function Root() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SquadaOne_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  return <Stack />;
}
