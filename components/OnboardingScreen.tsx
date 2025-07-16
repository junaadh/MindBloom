import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OnboardingScreenProps {
  onGetStarted?: () => void;
  onLogIn?: () => void;
}

export default function OnboardingScreen({
  onGetStarted,
  onLogIn,
}: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Logo and Title Section */}
      <View style={styles.logoContainer}>
        <View style={styles.centeredContent}>
          {/* Logo with concentric circles */}
          <View style={styles.logoWrapper}>
            <View style={styles.outerCircle}>
              <View style={styles.secondCircle}>
                <View style={styles.thirdCircle}>
                  <View style={styles.fourthCircle}>
                    <View style={styles.innerCircle} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* App name */}
          <Text style={styles.appName}>MINDBLOOM</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>Let your mind bloom</Text>
        </View>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={onGetStarted}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logInButton} onPress={onLogIn}>
          <Text style={styles.logInText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E7E2",
    paddingHorizontal: 36,
    paddingBottom: 122, // Account for button height (62) + gap (12) + bottom margin (36) + some padding
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    width: 99,
    height: 99,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  outerCircle: {
    width: 89.57,
    height: 89.57,
    borderRadius: 157.14,
    backgroundColor: "#D1E0D6",
    justifyContent: "center",
    alignItems: "center",
  },
  secondCircle: {
    width: 72.29,
    height: 72.29,
    borderRadius: 157.14,
    backgroundColor: "#E7EDE9",
    justifyContent: "center",
    alignItems: "center",
  },
  thirdCircle: {
    width: 62.86,
    height: 62.86,
    borderRadius: 157.14,
    backgroundColor: "#B5D0BE",
    justifyContent: "center",
    alignItems: "center",
  },
  fourthCircle: {
    width: 45.57,
    height: 45.57,
    borderRadius: 157.14,
    backgroundColor: "#E5ECE8",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 36.14,
    height: 36.14,
    borderRadius: 157.14,
    backgroundColor: "#89B697",
  },
  appName: {
    fontFamily: "SquadaOne_400Regular",
    fontSize: 34,
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
    letterSpacing: 2,
    lineHeight: 50,
  },
  subtitle: {
    fontFamily: "SF Pro",
    fontSize: 18,
    fontWeight: "300",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 36,
    left: 36,
    right: 36,
    gap: 12,
  },
  getStartedButton: {
    backgroundColor: "#89B697",
    borderRadius: 100,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  getStartedText: {
    fontFamily: "SF Pro",
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  logInButton: {
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  logInText: {
    fontFamily: "SF Pro",
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
});
