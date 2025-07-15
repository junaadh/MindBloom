import { BlurView } from "expo-blur";
import React, { useEffect, ReactNode } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface CustomModalProps {
  visible: boolean;
  onClose?: () => void;
  children?: ReactNode;
  blurIntensity?: number;
  blurTint?:
    | "light"
    | "dark"
    | "systemThinMaterial"
    | "systemChromeMaterial"
    | "systemUltraThinMaterialLight";
  onBackdropPress?: () => void;
  onTapAnywhere?: () => void; // Optional tap inside modal gesture
}

export default function CustomModal({
  visible,
  onClose,
  children,
  blurIntensity = 50,
  blurTint = "systemUltraThinMaterialLight",
  onBackdropPress,
  onTapAnywhere,
}: CustomModalProps) {
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  // Track internal modal visibility for animation
  const [internalVisible, setInternalVisible] = React.useState(visible);

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      // Animate out, then hide modal after animation
      translateY.value = withSpring(height, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => setInternalVisible(false), 300);
    }
  }, [visible]);

  const dismissModal = () => {
    if (onClose) onClose();
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 100 || e.velocityY > 500) {
        translateY.value = withSpring(height, { damping: 20, stiffness: 90 });
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(dismissModal)();
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleBackdrop = () => {
    if (onBackdropPress) onBackdropPress();
    if (onClose) onClose();
  };

  const handleTapInside = (e: any) => {
    e.stopPropagation();
    if (onTapAnywhere) onTapAnywhere();
  };

  return (
    <Modal
      transparent
      visible={internalVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdrop}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.blurContainer, backgroundStyle]}>
            <BlurView
              intensity={blurIntensity}
              tint={blurTint}
              style={styles.blurView}
            />
          </Animated.View>

          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <TouchableWithoutFeedback onPress={handleTapInside}>
              <View style={styles.modalWrapper}>
                <BlurView
                  intensity={blurIntensity + 30}
                  tint={blurTint}
                  style={styles.modalBlur}
                >
                  <View style={styles.modalContent}>
                    <GestureDetector gesture={panGesture}>
                      <View style={styles.handleBarContainer}>
                        <View style={styles.handleBar} />
                      </View>
                    </GestureDetector>
                    {children}
                  </View>
                </BlurView>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  blurView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    paddingHorizontal: 13,
    paddingBottom: 26,
  },
  modalWrapper: {
    borderRadius: 60,
    overflow: "hidden",
    marginHorizontal: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 20,
  },
  modalBlur: {
    borderRadius: 65,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  modalContent: {
    padding: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  handleBarContainer: {
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 24,
  },
  handleBar: {
    width: 97,
    height: 8,
    backgroundColor: "#F1F1F1",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
