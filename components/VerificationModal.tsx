import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface VerificationModalProps {
    visible: boolean;
    onClose?: () => void;
    onResendEmail?: () => void;
    onVerificationComplete?: () => void;
    email?: string;
}

export default function VerificationModal({
    visible,
    onClose,
    onResendEmail,
    onVerificationComplete,
    email
}: VerificationModalProps) {
    const translateY = useSharedValue(height);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            // Slide up animation
            translateY.value = withSpring(0, {
                damping: 20,
                stiffness: 90,
            });
            opacity.value = withTiming(1, { duration: 300 });
        } else {
            // Slide down animation
            translateY.value = withSpring(height, {
                damping: 20,
                stiffness: 90,
            });
            opacity.value = withTiming(0, { duration: 300 });
        }
    }, [visible]);

    const dismissModal = () => {
        if (onClose) {
            onClose();
        }
    };

    // Pan gesture for drag-to-dismiss
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Only allow downward dragging
            if (event.translationY > 0) {
                translateY.value = event.translationY;
            }
        })
        .onEnd((event) => {
            // Dismiss if dragged down more than 100 pixels or velocity is high
            if (event.translationY > 100 || event.velocityY > 500) {
                translateY.value = withSpring(height, {
                    damping: 20,
                    stiffness: 90,
                });
                opacity.value = withTiming(0, { duration: 300 });
                // Use runOnJS to properly call dismiss on UI thread
                runOnJS(dismissModal)();
            } else {
                // Spring back to original position
                translateY.value = withSpring(0, {
                    damping: 20,
                    stiffness: 90,
                });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const handleBackdropPress = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleResendEmail = () => {
        if (onResendEmail) {
            onResendEmail();
        }
    };

    const handleModalTap = () => {
        // Simulate email verification with 300ms delay
        setTimeout(() => {
            if (onVerificationComplete) {
                onVerificationComplete();
            }
        }, 300);
    };

    const handleModalContentTap = (e: any) => {
        // Prevent event from bubbling up to backdrop
        e.stopPropagation();
        handleModalTap();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.overlay}>
                    <Animated.View style={[styles.blurContainer, backgroundStyle]}>
                        <BlurView intensity={50} tint="systemUltraThinMaterialLight" style={styles.blurView} />
                    </Animated.View>

                    <Animated.View style={[styles.modalContainer, animatedStyle]}>
                        <TouchableWithoutFeedback onPress={handleModalContentTap}>
                            <View style={styles.modalWrapper}>
                                <BlurView intensity={80} tint="systemUltraThinMaterialLight" style={styles.modalBlur}>
                                    <View style={styles.modalContent}>
                                        {/* Handle bar with drag gesture */}
                                        <GestureDetector gesture={panGesture}>
                                            <View style={styles.handleBarContainer}>
                                                <View style={styles.handleBar} />
                                            </View>
                                        </GestureDetector>

                                        {/* Title */}
                                        <Text style={styles.title}>
                                            We have sent a verification link to your email
                                        </Text>

                                        {/* Subtitle */}
                                        <Text style={styles.subtitle}>
                                            Please check your inbox and click the link to verify your email address
                                        </Text>

                                        {/* Tap to verify hint */}
                                        <Text style={styles.tapHint}>
                                            (Tap anywhere to simulate verification)
                                        </Text>

                                        {/* Resend Email Button */}
                                        <TouchableOpacity
                                            style={styles.resendButton}
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                handleResendEmail();
                                            }}
                                        >
                                            <Text style={styles.resendButtonText}>Resend Email</Text>
                                        </TouchableOpacity>
                                    </View>
                                </BlurView>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    blurView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContainer: {
        paddingHorizontal: 13,
        paddingBottom: 26, // 36px padding + 34px iOS safe area bottom
    },
    modalWrapper: {
        borderRadius: 40,
        overflow: 'hidden',
        marginHorizontal: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.4,
        shadowRadius: 40,
        elevation: 20,
    },
    modalBlur: {
        borderRadius: 40,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    modalContent: {
        padding: 24,
        minHeight: 359,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    handleBarContainer: {
        alignItems: 'center',
        paddingVertical: 8,
        marginBottom: 32,
    },
    handleBar: {
        width: 97,
        height: 8,
        backgroundColor: '#F1F1F1',
        borderRadius: 100,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    tapHint: {
        fontSize: 12,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        lineHeight: 16,
        marginBottom: 24,
        paddingHorizontal: 16,
        fontStyle: 'italic',
    },
    resendButton: {
        backgroundColor: '#ECECEC',
        borderRadius: 100,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#5B5B5B',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    resendButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
});
