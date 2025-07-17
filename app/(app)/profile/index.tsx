import ProfileScreen from "@/components/ProfileScreen";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return <ProfileScreen router={router} />;
}
