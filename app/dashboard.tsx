import DashboardScreen from '@/components/DashboardScreen';
import { router } from 'expo-router';
import React from 'react';
import { TabType } from '@/components/TaskBar';

export default function Dashboard() {
  const handleTabPress = (tab: TabType) => {
    console.log('Tab pressed:', tab);

    switch (tab) {
      case 'home':
        // Already on home/dashboard
        break;
      case 'explore':
        // TODO: Navigate to explore screen
        console.log('Navigate to explore');
        break;
      case 'journal':
        // TODO: Navigate to journal screen
        console.log('Navigate to journal');
        break;
      case 'profile':
        // TODO: Navigate to profile screen
        console.log('Navigate to profile');
        break;
    }
  };

  return (
    <DashboardScreen
      onTabPress={handleTabPress}
    />
  );
}
