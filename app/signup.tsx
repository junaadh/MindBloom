import SignUpScreen from '@/components/SignUpScreen';
import { router } from 'expo-router';
import React from 'react';

export default function SignUp() {
  const handleBack = () => {
    router.back();
  };

  const handleSignUp = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // TODO: Handle sign up logic
    console.log('Sign up attempted with:', {
      name,
      email,
      password,
      confirmPassword,
    });
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleTermsAndConditions = () => {
    // TODO: Navigate to terms and conditions
    console.log('Terms and Conditions pressed');
  };

  const handleVerificationComplete = () => {
    router.push('/goals');
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
