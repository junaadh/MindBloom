import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomModal from "./CustomModal";

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
  email,
}: VerificationModalProps) {
  const handleResendEmail = () => {
    if (onResendEmail) onResendEmail();
  };

  const handleTapInside = () => {
    setTimeout(() => {
      if (onVerificationComplete) onVerificationComplete();
    }, 300);
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      onTapAnywhere={handleTapInside}
    >
      <Text style={styles.title}>
        We have sent a verification link to your email
      </Text>

      <Text style={styles.subtitle}>
        Please check your inbox and click the link to verify your email address
      </Text>

      <Text style={styles.tapHint}>
        (Tap anywhere to simulate verification)
      </Text>

      <TouchableOpacity
        style={styles.resendButton}
        onPress={(e) => {
          e.stopPropagation();
          handleResendEmail();
        }}
      >
        <Text style={styles.resendButtonText}>Resend Email</Text>
      </TouchableOpacity>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  tapHint: {
    fontSize: 12,
    fontWeight: "400",
    color: "#666666",
    textAlign: "center",
    lineHeight: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    fontStyle: "italic",
  },
  resendButton: {
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  resendButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
});
