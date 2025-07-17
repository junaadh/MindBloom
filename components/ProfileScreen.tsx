import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { useSession } from "@/session/ctx";

// Asset imports (ensure these files exist in assets/images/ProfileScreen)
// import avatar = require("../assets/images/ProfileScreen/profile_avatar.png");

// For SVGs, use react-native-svg-transformer (Expo supports this out of the box)
// import languageArrow from "../assets/images/ProfileScreen/language_arrow.svg";
// import explainabilityArrow from "../assets/images/ProfileScreen/explainability_arrow.svg";
// import notificationsToggle from "../assets/images/ProfileScreen/notifications_toggle.svg";

const FONT_FAMILY = Platform.OS === "ios" ? "SF Pro" : undefined;

interface ProfileScreenProps {
  router?: any;
}

const ProfileScreen: React.FC = ({ router }: ProfileScreenProps) => {
  const { logout } = useSession();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Account Section */}
        <Text style={styles.accountTitle}>Account</Text>
        <View style={styles.profileCard}>
          <Image
            source={require("../assets/images/profile_avatar.png")}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sophia Anderson</Text>
            <Text style={styles.profileEmail}>sophia.anderson@gmail.com</Text>
          </View>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionHeader}>Preferences</Text>
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Theme</Text>
          <Text style={styles.settingValue}>Light</Text>
          <View style={styles.faceIdButton} />
          <Text style={styles.settingIcon}>􀆭</Text>
        </View>
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Language</Text>
          <Text style={styles.settingValue}>English</Text>
          {/* // <SvgUri width={16} height={16} uri={languageArrow} /> */}
          <Text style={styles.settingIcon}>􀆪</Text>
        </View>
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Explainability Level</Text>
          <Text style={styles.settingValue}>Medium</Text>
          {/*// <SvgUri width={16} height={16} uri={explainabilityArrow} /> */}
          <Text style={styles.settingIcon}>􂮢</Text>
        </View>
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Face ID</Text>
          <View style={styles.faceIdButton} />
          <Text style={styles.settingIcon}>􀎽</Text>
        </View>

        {/* AI Settings & Accessibility */}
        <Text style={styles.sectionHeader}>AI Settings</Text>
        <Text style={styles.sectionHeader}>Accessibility</Text>

        {/* Notifications */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Notifications</Text>
          {/* // <Text style={styles.settingValue}>On</Text>
          // <SvgUri width={16} height={16} uri={notificationsToggle} />
          // <Text style={styles.settingIcon}>􀝖</Text> */}
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Delete Account Button */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E0E7E2",
  },
  container: {
    padding: 16,
    paddingBottom: 120,
    backgroundColor: "#E0E7E2",
  },
  accountTitle: {
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 12,
    color: "#000",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    fontSize: 20,
    color: "#000",
  },
  profileEmail: {
    fontFamily: FONT_FAMILY,
    fontWeight: "300",
    fontSize: 14,
    color: "#000",
    marginTop: 4,
  },
  sectionHeader: {
    fontFamily: FONT_FAMILY,
    fontWeight: "800",
    fontSize: 16,
    color: "#000",
    marginTop: 24,
    marginBottom: 8,
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  settingLabel: {
    flex: 2,
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  settingValue: {
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontWeight: "300",
    fontSize: 14,
    color: "#000",
    textAlign: "right",
  },
  settingIcon: {
    marginLeft: 12,
    fontSize: 22,
    color: "#000",
  },
  faceIdButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#89B697",
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#89B697",
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 8,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoutText: {
    color: "#fff",
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 32,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  deleteText: {
    color: "#B40000",
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    fontSize: 20,
  },
  taskbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  taskbarItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  taskbarLabel: {
    fontFamily: FONT_FAMILY,
    fontWeight: "400",
    fontSize: 12,
    color: "#000",
    marginTop: 4,
  },
  taskbarLabelActive: {
    color: "#000",
    fontWeight: "700",
  },
});

export default ProfileScreen;
