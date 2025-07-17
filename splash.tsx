import { useSession } from "@/session/ctx";
import { SplashScreen } from "expo-router";
// import { SquadaOne_400Regular, useFonts } from "@expo-google-fonts/squada-one";

export default function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
