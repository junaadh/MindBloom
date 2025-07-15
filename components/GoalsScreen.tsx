import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
// import { LinearGradient } from 'expo-linear-gradient';

interface GoalsScreenProps {
  onContinue?: (selectedGoals: string[]) => void;
}

const GOALS = [
  "Reduce anxiety",
  "Sleep better",
  "Build confidence",
  "Practice gratitude",
  "Manage stress",
  "Be more mindful",
  "Improve relationships",
  "Increase energy",
  "Improve mood",
  "Focus",
];

export default function GoalsScreen({ onContinue }: GoalsScreenProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) {
        return prev.filter((g) => g !== goal);
      } else {
        return [...prev, goal];
      }
    });
  };

  const handleContinue = () => {
    if (selectedGoals.length >= 3 && onContinue) {
      onContinue(selectedGoals);
    }
  };

  const renderProgressBar = () => {
    const selectedCount = selectedGoals.length;
    const bars = [];

    for (let i = 0; i < 3; i++) {
      const isActive = i < selectedCount;
      bars.push(
        <View
          key={i}
          style={[
            styles.progressBar,
            isActive ? styles.progressBarActive : styles.progressBarInactive,
          ]}
        />,
      );
    }

    return bars;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Gradient Background */}
      <View style={styles.gradientBackground} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress bars */}
        <View style={styles.progressContainer}>{renderProgressBar()}</View>

        {/* Title */}
        <Text style={styles.title}>What are your goals?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Select up to 3 goals to focus on. You can always change these later.
        </Text>

        {/* Goals grid */}
        <View style={styles.goalsContainer}>
          {GOALS.map((goal, index) => {
            const isSelected = selectedGoals.includes(goal);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.goalButton,
                  isSelected
                    ? styles.goalButtonSelected
                    : styles.goalButtonUnselected,
                ]}
                onPress={() => toggleGoal(goal)}
                activeOpacity={0.7}
              >
                <Text style={styles.goalText}>{goal}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedGoals.length >= 3
              ? styles.continueButtonEnabled
              : styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedGoals.length < 3}
          activeOpacity={0.7}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#E0E7E2",
  } as ViewStyle,
  scrollContent: {
    flexGrow: 1,
    paddingTop: 120, // Increased padding for iOS safe area
  } as ViewStyle,
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 36,
    marginBottom: 33,
    gap: 10,
  } as ViewStyle,
  progressBar: {
    width: 116,
    height: 8,
    borderRadius: 100,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,
  progressBarActive: {
    backgroundColor: "#89B697",
  } as ViewStyle,
  progressBarInactive: {
    backgroundColor: "#ECECEC",
  } as ViewStyle,
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 24,
    marginHorizontal: 36,
  } as TextStyle,
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#000000",
    textAlign: "left",
    lineHeight: 24,
    marginBottom: 58,
    marginHorizontal: 41,
  } as TextStyle,
  goalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 36,
    marginBottom: 84,
    gap: 14,
  } as ViewStyle,
  goalButton: {
    borderRadius: 100,
    height: 55,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    minWidth: 104,
  } as ViewStyle,
  goalButtonUnselected: {
    backgroundColor: "#ECECEC",
  } as ViewStyle,
  goalButtonSelected: {
    backgroundColor: "#B5D0BE",
  } as ViewStyle,
  goalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
  } as TextStyle,
  continueButton: {
    borderRadius: 100,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 36,
    marginBottom: 36,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,
  continueButtonEnabled: {
    backgroundColor: "#89B697",
  } as ViewStyle,
  continueButtonDisabled: {
    backgroundColor: "#ECECEC",
  } as ViewStyle,
  continueButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
  } as TextStyle,
});
