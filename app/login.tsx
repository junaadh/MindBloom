import LoginScreen from "@/components/LoginScreen";
import { router } from "expo-router";
import React from "react";

export default function Login() {
  const handleBack = () => {
    router.back();
  };

  const handleLogin = (username: string, password: string) => {
    // TODO: Handle login logic
    console.log("Login attempted with:", username, password);
    // Navigate to mood bar after successful login
    router.push("/mood-bar");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    console.log("Forgot Password pressed");
  };

  const handleUseFaceID = () => {
    // TODO: Handle Face ID authentication
    console.log("Use Face ID pressed");
  };

  return (
    <LoginScreen
      onBack={handleBack}
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onForgotPassword={handleForgotPassword}
      onUseFaceID={handleUseFaceID}
    />
  );
}
