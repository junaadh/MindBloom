import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import VerificationModal from './VerificationModal';

const { width, height } = Dimensions.get('window');

interface SignUpScreenProps {
    onBack?: () => void;
    onSignUp?: (name: string, email: string, password: string, confirmPassword: string) => void;
    onLogin?: () => void;
    onTermsAndConditions?: () => void;
    onVerificationComplete?: () => void;
}

export default function SignUpScreen({
    onBack,
    onSignUp,
    onLogin,
    onTermsAndConditions,
    onVerificationComplete
}: SignUpScreenProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);

    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value;
        },
        onActive: (event, context) => {
            // Only allow swiping right (positive direction)
            if (event.translationX > 0) {
                translateX.value = event.translationX;
                opacity.value = Math.max(0.3, 1 - event.translationX / width);
            }
        },
        onEnd: (event) => {
            if (event.translationX > width * 0.3) {
                // Swipe completed - navigate back
                translateX.value = withSpring(width);
                opacity.value = withSpring(0);
                if (onBack) {
                    runOnJS(onBack)();
                }
            } else {
                // Swipe not completed - return to original position
                translateX.value = withSpring(0);
                opacity.value = withSpring(1);
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            opacity: opacity.value,
        };
    });

    const handleSignUp = () => {
        if (onSignUp) {
            onSignUp(name, email, password, confirmPassword);
            // Show verification modal after successful sign up
            setShowVerificationModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowVerificationModal(false);
    };

    const handleResendEmail = () => {
        // TODO: Implement resend email logic
        console.log('Resend email to:', email);
    };

    const handleVerificationComplete = () => {
        setShowVerificationModal(false);
        if (onVerificationComplete) {
            onVerificationComplete();
        }
    };

    const toggleTermsAgreement = () => {
        setAgreedToTerms(!agreedToTerms);
    };

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.container, animatedStyle]}>
                <StatusBar style="dark" />

                {/* Header with back button */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Create Account</Text>
                </View>

                {/* Input fields */}
                <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Name</Text>
                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#808080"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Email</Text>
                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#808080"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Password</Text>
                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.input}
                            placeholder="Create your password"
                            placeholderTextColor="#808080"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Confirm Password</Text>
                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm your password"
                            placeholderTextColor="#808080"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={toggleTermsAgreement}
                    >
                        <View style={[styles.checkboxInner, agreedToTerms && styles.checkboxChecked]} />
                    </TouchableOpacity>
                    <Text style={styles.termsText}>I agree to the </Text>
                    <TouchableOpacity onPress={onTermsAndConditions}>
                        <Text style={styles.termsLink}>Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>

                {/* Create Account button */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>Create an account</Text>
                </TouchableOpacity>

                {/* Login link */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={onLogin}>
                        <Text style={styles.loginLink}>Log in</Text>
                    </TouchableOpacity>
                </View>

                <VerificationModal
                    visible={showVerificationModal}
                    onClose={handleCloseModal}
                    onResendEmail={handleResendEmail}
                    onVerificationComplete={handleVerificationComplete}
                    email={email}
                />
            </Animated.View>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E7E2',
        paddingHorizontal: 36,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 40,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: -12,
        zIndex: 1,
    },
    backArrow: {
        fontSize: 24,
        color: '#121714',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        flex: 1,
        lineHeight: 60,
    },
    inputContainer: {
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
        marginLeft: 12,
    },
    inputField: {
        backgroundColor: '#ECECEC',
        borderRadius: 100,
        height: 62,
        marginBottom: 16,
        paddingHorizontal: 24,
        justifyContent: 'center',
        shadowColor: '#5B5B5B',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    input: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '400',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#D4D4D4',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 2,
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#89B697',
    },
    termsText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '400',
    },
    termsLink: {
        fontSize: 14,
        color: '#89B697',
        fontWeight: '500',
    },
    signUpButton: {
        backgroundColor: '#89B697',
        borderRadius: 100,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#5B5B5B',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    signUpButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        left: 36,
        right: 36,
    },
    loginText: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '400',
    },
    loginLink: {
        fontSize: 14,
        color: '#89B697',
        fontWeight: '700',
    },
});
