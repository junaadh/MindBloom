import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Audio } from "expo-av";

interface MeditationPlayerProps {
  onBack?: () => void;
  onPause?: () => void;
  onReplay?: () => void;
  onStop?: () => void;
  minutes?: number; // total meditation time in minutes
}

export const unstable_settings = {
  initialRouteName: "new-entry",
};

export const screenOptions = {
  tabBarStyle: { display: "none" },
};

export default function MeditationPlayer({
  onBack,
  onPause,
  onReplay,
  onStop,
  minutes = 1,
}: MeditationPlayerProps) {
  // Timer and breathing rhythm logic
  const [totalSeconds, setTotalSeconds] = React.useState(minutes * 60);
  const [phase, setPhase] = React.useState<"inhale" | "hold" | "exhale">(
    "inhale",
  );
  const [phaseSeconds, setPhaseSeconds] = React.useState(4); // inhale starts at 4s
  const [isPaused, setIsPaused] = React.useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const loadAndPlaySound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/ocean.mp3"),
        { shouldPlay: true, isLooping: true },
      );
      soundRef.current = sound;
    };

    loadAndPlaySound();

    return () => {
      // Cleanup on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const handlePauseResume = async () => {
    if (!soundRef.current) return;

    if (isPaused) {
      await soundRef.current.playAsync();
      setIsPaused(false);
    } else {
      await soundRef.current.pauseAsync();
      setIsPaused(true);
    }
  };

  const handleReplay = async () => {
    if (!soundRef.current) return;

    await soundRef.current.setPositionAsync(0);
    await soundRef.current.playAsync();
    setTotalSeconds(minutes * 60);
    setPhase("inhale");
    setPhaseSeconds(4);
    setIsPaused(false);
    if (onReplay) onReplay();
  };

  const handleStop = async () => {
    if (!soundRef.current) return;

    await soundRef.current.stopAsync();
    setTotalSeconds(minutes * 60);
    setPhase("inhale");
    setPhaseSeconds(4);
    setIsPaused(false);
    if (onStop) onStop();
    if (onBack) onBack();
  };

  React.useEffect(() => {
    if (totalSeconds <= 0 && soundRef.current) {
      soundRef.current.stopAsync();
    }
  }, [totalSeconds]);

  // Animated logo logic (copied from MoodBarScreen)
  const pulseAnimation = useSharedValue(1);

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

  // Timer effect
  React.useEffect(() => {
    if (totalSeconds <= 0 || isPaused) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setPhaseSeconds((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, phaseSeconds, isPaused]);

  // Phase switching effect
  React.useEffect(() => {
    if (phaseSeconds === 0 && totalSeconds > 0) {
      if (phase === "inhale") {
        setPhase("hold");
        setPhaseSeconds(4);
      } else if (phase === "hold") {
        setPhase("exhale");
        setPhaseSeconds(6);
      } else if (phase === "exhale") {
        setPhase("inhale");
        setPhaseSeconds(4);
      }
    }
  }, [phaseSeconds, phase, totalSeconds]);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: "#89B697",
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  const animatedMiddleCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: "#B5D0BE",
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  const animatedOuterCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: "#D1E0D6",
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#121714" />
      </TouchableOpacity>

      {/* Blurred Animated Logo */}
      <View style={styles.logoContainer}>
        <BlurView intensity={30} tint="light" style={styles.logoBlurWrapper}>
          <Animated.View style={[styles.frame5, animatedOuterCircleStyle]}>
            <View style={styles.transparentBand1}>
              <Animated.View style={[styles.frame4, animatedOuterCircleStyle]}>
                <Animated.View
                  style={[styles.frame3, animatedMiddleCircleStyle]}
                >
                  <View style={styles.transparentBand2}>
                    <Animated.View
                      style={[styles.frame2, animatedMiddleCircleStyle]}
                    >
                      <Animated.View
                        style={[styles.frame1, animatedLogoStyle]}
                      />
                    </Animated.View>
                  </View>
                </Animated.View>
              </Animated.View>
            </View>
          </Animated.View>
        </BlurView>
      </View>

      {/* Phase Text, Emoji, and Instructions */}
      <Text style={styles.phaseText}>
        {phase === "inhale" && "Inhale"}
        {phase === "hold" && "Hold"}
        {phase === "exhale" && "Exhale"}
      </Text>

      {/* Seconds Text */}
      <Text style={styles.secondsText}>{phaseSeconds} seconds</Text>

      {/* Controls */}
      <View style={styles.controlsRow}>
        {/* Replay */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            setTotalSeconds(minutes * 60);
            setPhase("inhale");
            setPhaseSeconds(20);
            setIsPaused(false);
            handleReplay();
            if (onReplay) onReplay();
          }}
        >
          <View style={[styles.iconCircle, styles.replayCircle]}>
            <Ionicons name="refresh" size={32} color="#121714" />
          </View>
        </TouchableOpacity>
        {/* Pause/Play */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            handlePauseResume();
            setIsPaused((prev) => !prev);
          }}
        >
          <View style={[styles.iconCircle, styles.pauseCircle]}>
            <Ionicons
              name={isPaused ? "play" : "pause"}
              size={32}
              color="#121714"
            />
          </View>
        </TouchableOpacity>
        {/* Stop */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            setTotalSeconds(minutes * 60);
            setPhase("inhale");
            setPhaseSeconds(20);
            setIsPaused(false);
            handleStop();
            if (onStop) onStop();
            if (onBack) onBack();
          }}
        >
          <View style={[styles.iconCircle, styles.stopCircle]}>
            <Ionicons name="stop" size={32} color="#121714" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 440,
    height: 956,
    backgroundColor: "#E0E7E2",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backArrow: {
    position: "absolute",
    top: 92,
    left: 41,
    width: 24,
    height: 24,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrowImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#121714",
  },
  logoContainer: {
    position: "absolute",
    top: 262,
    left: 65,
    width: 313,
    height: 313,
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    width: 313,
    height: 313,
    textAlign: "center",
  },
  logoBlurWrapper: {
    borderRadius: 156.5,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 2,
    borderColor: "#E0E7E2",
  },
  logoBlurOverlay: {
    ...StyleSheet.absoluteFillObject,
    // Simulate blur by overlaying semi-transparent white
    // For true blur, use BlurView from expo-blur if available
  },
  frame5: {
    width: 283.19,
    height: 283.19,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  },
  transparentBand1: {
    width: 228.54,
    height: 228.54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  frame4: {
    width: 228.54,
    height: 228.54,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  },
  frame3: {
    width: 198.73,
    height: 198.73,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  },
  transparentBand2: {
    width: 144.08,
    height: 144.08,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  frame2: {
    width: 144.08,
    height: 144.08,
    borderRadius: 496.83,
    alignItems: "center",
    justifyContent: "center",
  },
  frame1: {
    width: 114.27,
    height: 114.27,
    borderRadius: 496.83,
  },
  phaseText: {
    position: "absolute",
    top: 667,
    left: 68,
    width: 308,
    height: 60,
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontWeight: "700",
    fontSize: 32,
    color: "#000",
    textAlign: "center",
    lineHeight: 37,
  },
  secondsText: {
    position: "absolute",
    top: 716,
    left: 120,
    width: 201,
    height: 26,
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontWeight: "400",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    lineHeight: 24,
  },
  controlsRow: {
    position: "absolute",
    top: 780,
    left: 36,
    width: 367,
    height: 71,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    gap: 0,
  },
  controlButton: {
    width: 71,
    height: 71,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  replayCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#ECECEC",
  },
  pauseCircle: {
    width: 71,
    height: 71,
    backgroundColor: "#89B697",
  },
  stopCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#ECECEC",
  },
  iconImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    tintColor: "#121714",
  },
});
