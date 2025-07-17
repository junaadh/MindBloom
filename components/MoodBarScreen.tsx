import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withSpring,
  withRepeat,
  withSequence,
  interpolateColor,
} from "react-native-reanimated";

interface MoodBarScreenProps {
  onContinue?: (mood: string) => void;
}

const MOODS = {
  VERY_UNPLEASANT: "Very Unpleasant",
  UNPLEASANT: "Unpleasant",
  NEUTRAL: "Neutral",
  PLEASANT: "Pleasant",
  VERY_PLEASANT: "Very Pleasant",
};

const MOOD_COLORS = {
  [MOODS.VERY_UNPLEASANT]: "#C8A8C8", // Soft lavender
  [MOODS.UNPLEASANT]: "#D4B8C4", // Muted rose
  [MOODS.NEUTRAL]: "#89B697", // Original green
  [MOODS.PLEASANT]: "#A8D0B8", // Soft mint
  [MOODS.VERY_PLEASANT]: "#7BA885", // Deeper sage (different from neutral)
};

export default function MoodBarScreen({ onContinue }: MoodBarScreenProps) {
  const [currentMood, setCurrentMood] = useState(MOODS.NEUTRAL);
  const translateX = useSharedValue(162); // Start at center (162px from left)
  const colorTransition = useSharedValue(0.5); // 0 = very unpleasant, 1 = very pleasant
  const pulseAnimation = useSharedValue(1);

  const getMoodFromPosition = (position: number) => {
    const normalizedPosition = position / 324; // 324 is the total width of movement

    if (normalizedPosition <= 0.2) return MOODS.VERY_UNPLEASANT;
    if (normalizedPosition <= 0.4) return MOODS.UNPLEASANT;
    if (normalizedPosition <= 0.6) return MOODS.NEUTRAL;
    if (normalizedPosition <= 0.8) return MOODS.PLEASANT;
    return MOODS.VERY_PLEASANT;
  };

  const updateMood = (position: number) => {
    const newMood = getMoodFromPosition(position);
    setCurrentMood(newMood);

    // Smooth color transition
    const normalizedPosition = position / 324;
    colorTransition.value = withSpring(normalizedPosition, {
      damping: 15,
      stiffness: 100,
    });
  };

  // Start pulsing animation
  React.useEffect(() => {
    pulseAnimation.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 25, stiffness: 20 }),
        withSpring(1, { damping: 25, stiffness: 20 }),
      ),
      -1,
      true,
    );
  }, [pulseAnimation]);

  const animatedSliderStyle = useAnimatedStyle(() => {
    const currentColor = interpolateColor(
      colorTransition.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        MOOD_COLORS[MOODS.VERY_UNPLEASANT],
        MOOD_COLORS[MOODS.UNPLEASANT],
        MOOD_COLORS[MOODS.NEUTRAL],
        MOOD_COLORS[MOODS.PLEASANT],
        MOOD_COLORS[MOODS.VERY_PLEASANT],
      ],
    );

    return {
      backgroundColor: currentColor,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_: any, context: { startX: number }) => {
      context.startX = translateX.value;
    },
    onActive: (event: any, context: { startX: number }) => {
      const newX = context.startX + event.translationX;
      const clampedX = Math.max(0, Math.min(324, newX)); // Clamp between 0 and 324
      translateX.value = clampedX;
      runOnJS(updateMood)(clampedX);
    },
    onEnd: () => {
      // Optional: Add spring animation or snap to positions
    },
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Animated styles for smooth color transitions
  const animatedLogoStyle = useAnimatedStyle(() => {
    const currentColor = interpolateColor(
      colorTransition.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        MOOD_COLORS[MOODS.VERY_UNPLEASANT],
        MOOD_COLORS[MOODS.UNPLEASANT],
        MOOD_COLORS[MOODS.NEUTRAL],
        MOOD_COLORS[MOODS.PLEASANT],
        MOOD_COLORS[MOODS.VERY_PLEASANT],
      ],
    );

    return {
      backgroundColor: currentColor,
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  const animatedMiddleCircleStyle = useAnimatedStyle(() => {
    const currentColor = interpolateColor(
      colorTransition.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        MOOD_COLORS[MOODS.VERY_UNPLEASANT] + "50",
        MOOD_COLORS[MOODS.UNPLEASANT] + "50",
        MOOD_COLORS[MOODS.NEUTRAL] + "50",
        MOOD_COLORS[MOODS.PLEASANT] + "50",
        MOOD_COLORS[MOODS.VERY_PLEASANT] + "50",
      ],
    );

    return {
      backgroundColor: currentColor,
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  const animatedOuterCircleStyle = useAnimatedStyle(() => {
    const currentColor = interpolateColor(
      colorTransition.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        MOOD_COLORS[MOODS.VERY_UNPLEASANT] + "20",
        MOOD_COLORS[MOODS.UNPLEASANT] + "20",
        MOOD_COLORS[MOODS.NEUTRAL] + "20",
        MOOD_COLORS[MOODS.PLEASANT] + "20",
        MOOD_COLORS[MOODS.VERY_PLEASANT] + "20",
      ],
    );

    return {
      backgroundColor: currentColor,
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Logo - Based on Figma design with transparent bands */}
      <View style={styles.logoContainer}>
        {/* Outermost circle - Frame 5 */}
        <Animated.View style={[styles.frame5, animatedOuterCircleStyle]}>
          {/* Transparent band, then Frame 4 */}
          <View style={styles.transparentBand1}>
            <Animated.View style={[styles.frame4, animatedOuterCircleStyle]}>
              {/* Frame 3 */}
              <Animated.View style={[styles.frame3, animatedMiddleCircleStyle]}>
                {/* Transparent band, then Frame 2 */}
                <View style={styles.transparentBand2}>
                  <Animated.View
                    style={[styles.frame2, animatedMiddleCircleStyle]}
                  >
                    {/* Inner circle - Frame 1 */}
                    <Animated.View style={[styles.frame1, animatedLogoStyle]} />
                  </Animated.View>
                </View>
              </Animated.View>
            </Animated.View>
          </View>
        </Animated.View>
      </View>

      {/* Title */}
      <Text style={styles.title}>How are you feeling today?</Text>

      {/* Current Mood Display */}
      <Text style={styles.currentMood}>{currentMood}</Text>

      {/* Mood Bar */}
      <View style={styles.moodBarContainer}>
        <Animated.View style={[styles.moodBar, animatedSliderStyle]}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.moodThumb, thumbStyle]} />
          </PanGestureHandler>
        </Animated.View>
      </View>

      {/* Mood Labels */}
      <View style={styles.moodLabelsContainer}>
        <Text style={styles.moodLabel}>Very unpleasant</Text>
        <Text style={styles.moodLabel}>Very pleasant</Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => onContinue?.(currentMood)}
        activeOpacity={0.7}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 440,
    height: 956,
    backgroundColor: "#E0E7E2",
  } as ViewStyle,
  logoContainer: {
    position: "absolute",
    top: 262,
    left: 65,
    width: 313,
    height: 313,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  frame5: {
    width: 283.19,
    height: 283.19,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  transparentBand1: {
    width: 228.54,
    height: 228.54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  } as ViewStyle,
  frame4: {
    width: 228.54,
    height: 228.54,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  frame3: {
    width: 198.73,
    height: 198.73,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  transparentBand2: {
    width: 144.08,
    height: 144.08,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  } as ViewStyle,
  frame2: {
    width: 144.08,
    height: 144.08,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  frame1: {
    width: 114.27,
    height: 114.27,
    borderRadius: 496.83,
  } as ViewStyle,
  title: {
    position: "absolute",
    top: 161,
    left: 68,
    width: 308,
    height: 80,
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 37,
    flexWrap: "wrap",
  } as TextStyle,
  currentMood: {
    position: "absolute",
    top: 617,
    left: 68,
    width: 308,
    height: 60,
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 37,
  } as TextStyle,
  moodBarContainer: {
    position: "absolute",
    top: 687,
    left: 35,
    width: 367,
    height: 45,
  } as ViewStyle,
  moodBar: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    opacity: 0.7,
  } as ViewStyle,
  moodThumb: {
    position: "absolute",
    top: 1,
    width: 43,
    height: 43,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,
  moodLabelsContainer: {
    position: "absolute",
    top: 739,
    left: 0,
    width: 440,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  } as ViewStyle,
  moodLabel: {
    fontSize: 16,
    fontWeight: "300",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
    width: 201,
  } as TextStyle,
  continueButton: {
    position: "absolute",
    top: 800,
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
  continueButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
  } as TextStyle,
});
