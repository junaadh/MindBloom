import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface NotificationScreenProps {
  onEnableNotifications?: () => void;
  onMaybeLater?: () => void;
}

export default function NotificationScreen({
  onEnableNotifications,
  onMaybeLater,
}: NotificationScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background */}
      <LinearGradient
        colors={["#EADACD", "#F4E7DD", "#DBC5B1", "#DBC9B7", "#F1E1D7"]}
        locations={[0.05153, 0.23187, 0.46619, 0.55571, 0.60826]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* Image/illustration area */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/notification-bell.png")}
          style={styles.notificationImage}
          resizeMode="contain"
        />
      </View>

      {/* Title text */}
      <Text style={styles.title}>
        Allow notifications to get personalized daily check-ins
      </Text>

      {/* Enable Notifications button */}
      <TouchableOpacity
        style={styles.enableButton}
        onPress={onEnableNotifications}
        activeOpacity={0.7}
      >
        <Text style={styles.enableButtonText}>Enable Notifications</Text>
      </TouchableOpacity>

      {/* Maybe Later button */}
      <TouchableOpacity
        style={styles.maybeLaterButton}
        onPress={onMaybeLater}
        activeOpacity={0.7}
      >
        <Text style={styles.maybeLaterButtonText}>Maybe Later</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 440,
    height: 956,
  } as ViewStyle,
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  } as ViewStyle,
  imageContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 440,
    height: 480,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  notificationImage: {
    width: 440,
    height: 480,
  } as ImageStyle,
  title: {
    position: "absolute",
    top: 583,
    left: 36,
    width: 367,
    height: 120,
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 40,
  } as TextStyle,
  enableButton: {
    position: "absolute",
    top: 776,
    left: 36,
    width: 367,
    height: 62,
    backgroundColor: "#89B697",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,
  enableButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24, // 1.2em * 20px
  } as TextStyle,
  maybeLaterButton: {
    position: "absolute",
    top: 850,
    left: 36,
    width: 367,
    height: 62,
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,
  maybeLaterButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24, // 1.2em * 20px
  } as TextStyle,
});
