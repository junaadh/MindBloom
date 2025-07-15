import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";

export type TabType = "home" | "explore" | "journal" | "profile";

interface TaskBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: "home" },
  { id: "explore", label: "Explore", icon: "search" },
  { id: "journal", label: "Journal", icon: "book" },
  { id: "profile", label: "Profile", icon: "person" },
] as const;

export default function TaskBar({ activeTab, onTabPress }: TaskBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.taskbar}>
        <BlurView
          intensity={40}
          tint="dark"
          // fallbackColor="rgba(18, 20, 23, 0.4)"
          style={styles.blurOverlay}
        />
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabContainer}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={isActive ? "#000" : "#fff"}
                style={styles.icon}
              />
              <Text
                style={[styles.label, { color: isActive ? "#000" : "#fff" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    width: "100%",
  } as ViewStyle,

  taskbar: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 348,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",

    // shadow
    backgroundColor: "rgba(18, 20, 23, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 13,
    elevation: 8,
  } as ViewStyle,

  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
  } as ViewStyle,

  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  } as ViewStyle,

  icon: {
    marginBottom: 2,
  } as TextStyle,

  label: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "center",
  } as TextStyle,
});
