import GoalsScreen from '@/components/GoalsScreen';
import LoginScreen from '@/components/LoginScreen';
import NotificationScreen from '@/components/NotificationScreen';
import OnboardingScreen from '@/components/OnboardingScreen';
import SignUpScreen from '@/components/SignUpScreen';
import SplashScreen from '@/components/SplashScreen';
import React, { useEffect, useState } from 'react';

type Screen = 'splash' | 'onboarding' | 'login' | 'signup' | 'goals' | 'notifications';
type NavigationHistory = Screen[];

export default function Index() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
    const [navigationHistory, setNavigationHistory] = useState<NavigationHistory>(['splash']);

    useEffect(() => {
        // Show onboarding screen after 500ms delay
        const timer = setTimeout(() => {
            navigateToScreen('onboarding');
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const navigateToScreen = (screen: Screen) => {
        setCurrentScreen(screen);
        setNavigationHistory(prev => [...prev, screen]);
    };

    const navigateBack = () => {
        if (navigationHistory.length > 1) {
            const newHistory = navigationHistory.slice(0, -1);
            const previousScreen = newHistory[newHistory.length - 1];
            setNavigationHistory(newHistory);
            setCurrentScreen(previousScreen);
        }
    };

    const handleGetStarted = () => {
        navigateToScreen('signup');
    };

    const handleLogIn = () => {
        navigateToScreen('login');
    };

    const handleLogin = (username: string, password: string) => {
        // TODO: Handle login logic
        console.log('Login attempted with:', username, password);
    };

    const handleSignUpFromLogin = () => {
        navigateToScreen('signup');
    };

    const handleLoginFromSignUp = () => {
        navigateToScreen('login');
    };

    const handleSignUp = (name: string, email: string, password: string, confirmPassword: string) => {
        // TODO: Handle sign up logic
        console.log('Sign up attempted with:', { name, email, password, confirmPassword });
    };

    const handleVerificationComplete = () => {
        navigateToScreen('goals');
    };

    const handleGoalsContinue = (selectedGoals: string[]) => {
        // TODO: Handle goals selection
        console.log('Goals selected:', selectedGoals);
        navigateToScreen('notifications');
    };

    const handleEnableNotifications = () => {
        // TODO: Handle notification permission
        console.log('Notifications enabled');
        // Navigate to next screen when ready
    };

    const handleMaybeLater = () => {
        // TODO: Handle maybe later action
        console.log('Maybe later selected');
        // Navigate to next screen when ready
    };

    const handleForgotPassword = () => {
        // TODO: Navigate to forgot password screen
        console.log('Forgot Password pressed');
    };

    const handleUseFaceID = () => {
        // TODO: Handle Face ID authentication
        console.log('Use Face ID pressed');
    };

    const handleTermsAndConditions = () => {
        // TODO: Navigate to terms and conditions
        console.log('Terms and Conditions pressed');
    };

    if (currentScreen === 'notifications') {
        return (
            <NotificationScreen
                onEnableNotifications={handleEnableNotifications}
                onMaybeLater={handleMaybeLater}
            />
        );
    }

    if (currentScreen === 'goals') {
        return (
            <GoalsScreen
                onContinue={handleGoalsContinue}
            />
        );
    }

    if (currentScreen === 'signup') {
        return (
            <SignUpScreen
                onBack={navigateBack}
                onSignUp={handleSignUp}
                onLogin={handleLoginFromSignUp}
                onTermsAndConditions={handleTermsAndConditions}
                onVerificationComplete={handleVerificationComplete}
            />
        );
    }

    if (currentScreen === 'login') {
        return (
            <LoginScreen
                onBack={navigateBack}
                onLogin={handleLogin}
                onSignUp={handleSignUpFromLogin}
                onForgotPassword={handleForgotPassword}
                onUseFaceID={handleUseFaceID}
            />
        );
    }

    if (currentScreen === 'onboarding') {
        return (
            <OnboardingScreen
                onGetStarted={handleGetStarted}
                onLogIn={handleLogIn}
            />
        );
    }

    return <SplashScreen />;
}
