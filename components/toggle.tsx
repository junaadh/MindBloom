import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface FaceIDToggleProps {
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export default function Toggle({
  enabled = false,
  onToggle,
}: FaceIDToggleProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const toggleX = useSharedValue(isEnabled ? 18 : 0);
  const toggleOpacity = useSharedValue(isEnabled ? 1 : 0.3);

  useEffect(() => {
    toggleX.value = withSpring(isEnabled ? 18 : 0);
    toggleOpacity.value = withSpring(isEnabled ? 1 : 0.3);
  }, [isEnabled]);

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: isEnabled ? "#34C759" : "#D4D4D4",
  }));

  const toggleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: toggleX.value }],
    opacity: toggleOpacity.value,
  }));

  const handleToggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (onToggle) onToggle(newValue);
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.touchable}>
      <Animated.View style={[styles.track, trackAnimatedStyle]}>
        <Animated.View style={[styles.thumb, toggleAnimatedStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: 51,
    height: 31,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  track: {
    width: 47,
    height: 27,
    borderRadius: 15.5,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumb: {
    width: 23,
    height: 23,
    borderRadius: 13.5,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
