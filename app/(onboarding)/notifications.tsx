import NotificationScreen from '@/components/NotificationScreen';
import { router } from 'expo-router';
import React from 'react';

export default function Notifications() {
  const handleEnableNotifications = () => {
    // TODO: Handle notification permission
    console.log('Notifications enabled');
    router.push('/ai-guide');
  };

  const handleMaybeLater = () => {
    // TODO: Handle maybe later action
    console.log('Maybe later selected');
    router.push('/ai-guide');
  };

  return (
    <NotificationScreen
      onEnableNotifications={handleEnableNotifications}
      onMaybeLater={handleMaybeLater}
    />
  );
}
