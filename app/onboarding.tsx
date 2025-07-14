import OnboardingScreen from '@/components/OnboardingScreen';
import { router } from 'expo-router';
import React from 'react';

export default function Onboarding() {
  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleLogIn = () => {
    router.push('/login');
  };

  return (
    <OnboardingScreen
      onGetStarted={handleGetStarted}
      onLogIn={handleLogIn}
    />
  );
}
