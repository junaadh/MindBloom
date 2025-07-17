import GoalsScreen from '@/components/GoalsScreen';
import { router } from 'expo-router';
import React from 'react';

export default function Goals() {
  const handleGoalsContinue = (selectedGoals: string[]) => {
    // TODO: Handle goals selection
    console.log('Goals selected:', selectedGoals);
    router.push('/notifications');
  };

  return (
    <GoalsScreen
      onContinue={handleGoalsContinue}
    />
  );
}
