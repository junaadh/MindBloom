import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.logoContainer}>
                {/* Logo with concentric circles */}
                <View style={styles.logoWrapper}>
                    <View style={styles.outerCircle}>
                        <View style={styles.secondCircle}>
                            <View style={styles.thirdCircle}>
                                <View style={styles.fourthCircle}>
                                    <View style={styles.innerCircle} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* App name */}
                <Text style={styles.appName}>MINDBLOOM</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E7E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        width: 99,
        height: 99,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    outerCircle: {
        width: 89.57,
        height: 89.57,
        borderRadius: 157.14,
        backgroundColor: '#D1E0D6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondCircle: {
        width: 72.29,
        height: 72.29,
        borderRadius: 157.14,
        backgroundColor: '#E7EDE9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thirdCircle: {
        width: 62.86,
        height: 62.86,
        borderRadius: 157.14,
        backgroundColor: '#B5D0BE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fourthCircle: {
        width: 45.57,
        height: 45.57,
        borderRadius: 157.14,
        backgroundColor: '#E5ECE8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 36.14,
        height: 36.14,
        borderRadius: 157.14,
        backgroundColor: '#89B697',
    },
    appName: {
        fontFamily: 'SpaceMono',
        fontSize: 34,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',
        letterSpacing: 2,
    },
});
