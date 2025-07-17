import SignUpScreen from "@/components/SignUpScreen";
import { useSession } from "@/session/ctx";
import { router } from "expo-router";
import React from "react";

export default function SignUp() {
  const handleBack = () => {
    router.back();
  };
  const { signup } = useSession();

  const handleSignUp = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    console.log("Sign up attempted with:", {
      name,
      email,
      password,
      confirmPassword,
    });
    signup(email, password);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleTermsAndConditions = () => {
    console.log("Terms and Conditions pressed");
  };

  const handleVerificationComplete = () => {
    router.replace("/goals");
  };

  return (
    <SignUpScreen
      onBack={handleBack}
      onSignUp={handleSignUp}
      onLogin={handleLogin}
      onTermsAndConditions={handleTermsAndConditions}
      onVerificationComplete={handleVerificationComplete}
    />
  );
}
