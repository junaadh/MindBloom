import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface LoginScreenProps {
  onBack?: () => void;
  onLogin?: (username: string, password: string) => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onUseFaceID?: () => void;
}

export default function LoginScreen({
  onBack,
  onLogin,
  onSignUp,
  onForgotPassword,
  onUseFaceID,
}: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [faceIDEnabled, setFaceIDEnabled] = useState(false);

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const toggleX = useSharedValue(0);
  const toggleOpacity = useSharedValue(0.3);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: any) => {
      if (event.translationX > 0) {
        translateX.value = event.translationX;
        opacity.value = Math.max(0.3, 1 - event.translationX / width);
      }
    },
    onEnd: (event) => {
      if (event.translationX > width * 0.3) {
        translateX.value = withSpring(width);
        opacity.value = withSpring(0);
        if (onBack) runOnJS(onBack)();
      } else {
        translateX.value = withSpring(0);
        opacity.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const toggleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: toggleX.value }],
    opacity: toggleOpacity.value,
  }));

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: faceIDEnabled ? "#34C759" : "#D4D4D4",
  }));

  const toggleFaceID = () => {
    const newValue = !faceIDEnabled;
    setFaceIDEnabled(newValue);

    toggleX.value = withSpring(newValue ? 18 : 0);
    toggleOpacity.value = withSpring(newValue ? 1 : 0.3);

    if (onUseFaceID) onUseFaceID();
  };

  const handleLogin = () => {
    if (onLogin) onLogin(username, password);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <StatusBar style="dark" />

          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>LogIn</Text>
          </View>

          <Text style={styles.welcomeText}>Welcome back!</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#808080"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#808080"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.faceIDButton}
              onPress={toggleFaceID}
            >
              <Animated.View style={[styles.faceIDIcon, trackAnimatedStyle]}>
                <Animated.View
                  style={[styles.faceIDInner, toggleAnimatedStyle]}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFaceID}>
              <Text style={styles.faceIDText}>Use Face ID</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // ... same styles you already wrote
  container: {
    flex: 1,
    backgroundColor: "#E0E7E2",
    paddingHorizontal: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 40,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: -12,
    zIndex: 1,
  },
  backArrow: {
    fontSize: 24,
    color: "#121714",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    flex: 1,
    lineHeight: 60,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#000000",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputField: {
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 62,
    marginBottom: 16,
    paddingHorizontal: 24,
    justifyContent: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
    gap: 20,
  },
  faceIDButton: {
    borderRadius: 100,
    width: 51,
    height: 31,
    justifyContent: "center",
    alignItems: "center",
  },
  faceIDIcon: {
    width: 47,
    height: 27,
    backgroundColor: "#D4D4D4",
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
  faceIDInner: {
    width: 23,
    height: 23,
    backgroundColor: "#FFFFFF",
    borderRadius: 13.5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  faceIDText: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "400",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "400",
    marginLeft: "auto",
  },
  loginButton: {
    backgroundColor: "#89B697",
    borderRadius: 100,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 36,
    right: 36,
  },
  signUpText: {
    fontSize: 14,
    color: "#808080",
    fontWeight: "400",
  },
  signUpLink: {
    fontSize: 14,
    color: "#89B697",
    fontWeight: "700",
  },
});
