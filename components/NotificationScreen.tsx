import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface NotificationScreenProps {
    onEnableNotifications?: () => void;
    onMaybeLater?: () => void;
}

export default function NotificationScreen({
    onEnableNotifications,
    onMaybeLater
}: NotificationScreenProps) {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Background */}
            <View style={styles.gradientBackground} />

            {/* Main content area */}
            <View style={styles.contentContainer}>
                {/* Image/illustration area */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/notification-bell.png')}
                        style={styles.notificationImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Title text */}
                <Text style={styles.title}>
                    Allow notifications to get personalized daily check-ins
                </Text>

                {/* Buttons container */}
                <View style={styles.buttonsContainer}>
                    {/* Enable Notifications button */}
                    <TouchableOpacity
                        style={styles.enableButton}
                        onPress={onEnableNotifications}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.enableButtonText}>Enable Notifications</Text>
                    </TouchableOpacity>

                    {/* Maybe Later button */}
                    <TouchableOpacity
                        style={styles.maybeLaterButton}
                        onPress={onMaybeLater}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.maybeLaterButtonText}>Maybe Later</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#E8D7CA', // Average of the gradient colors
    },
    contentContainer: {
        flex: 1,
        paddingTop: 120, // iOS safe area padding
        paddingHorizontal: 36,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    notificationImage: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 37,
        marginBottom: 60,
        paddingHorizontal: 14,
    },
    buttonsContainer: {
        width: '100%',
        gap: 12,
        marginBottom: 44,
    },
    enableButton: {
        backgroundColor: '#89B697',
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
    enableButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24,
    },
    maybeLaterButton: {
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
    maybeLaterButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24,
    },
});
