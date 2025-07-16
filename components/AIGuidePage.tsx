import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface AIGuidePageProps {
  onNext?: () => void;
  onSkipDemo?: () => void;
}

export default function AIGuidePage({ onNext, onSkipDemo }: AIGuidePageProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background */}
      <LinearGradient
        colors={["#E5C2A6", "#EDD5C3"]}
        start={{ x: 0.5, y: 0.66 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* Image placeholder - replace with actual image when available */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/ai-guide.png")}
          style={styles.aiImage}
          resizeMode="cover"
        />
      </View>

      {/* Title and Description Container */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>This is how AI will guide you</Text>
        <Text style={styles.description}>
          Your AI companion will provide personalized feedback on your journal
          entries, offering insights and guidance to help you manage stress and
          promote mindfulness.
        </Text>
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={onNext}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Skip Demo button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={onSkipDemo}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Skip Demo</Text>
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
    top: 0,
    left: 0,
    width: "100%",
    height: 635,
    backgroundColor: "#FFFFFF",
  } as ViewStyle,
  aiImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    top: 544,
    paddingHorizontal: 28,
    width: "100%",
    alignItems: "center",
  } as ViewStyle,
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 37, // approximately 1.15625em * 32px
    width: 353,
    marginBottom: -2,
  } as TextStyle,
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: "#000000",
    textAlign: "left",
    lineHeight: 24, // 1.5em * 16px
  } as TextStyle,
  nextButton: {
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
  skipButton: {
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
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24, // 1.2em * 20px
  } as TextStyle,
});
