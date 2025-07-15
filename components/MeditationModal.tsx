import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import CustomModal from "./CustomModal";

interface MeditationModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: (duration: number) => void;
}

const DURATIONS = [1, 5, 10, 15, 20];

export default function MeditationModal({
  visible,
  onClose,
  onStart,
}: MeditationModalProps) {
  const [selectedDuration, setSelectedDuration] = React.useState<number>(10);

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <Text style={styles.title}>Meditation</Text>
      <Text style={styles.subtitle}>Select Duration</Text>
      <View style={styles.durationGrid}>
        {DURATIONS.map((duration, idx) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              selectedDuration === duration && styles.durationButtonSelected,
              // Add marginRight except for last in row
              (idx + 1) % 3 !== 0 ? { marginRight: 12 } : {},
              // Add marginBottom except for last row
              idx < DURATIONS.length - 3 ? { marginBottom: 16 } : {},
            ]}
            onPress={() => setSelectedDuration(duration)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.durationText,
                selectedDuration === duration && styles.durationTextSelected,
              ]}
            >
              {duration} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => onStart(selectedDuration)}
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  // Modal layout is now handled by CustomModal
  title: {
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontWeight: "700",
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontWeight: "600",
    fontSize: 20,
    color: "#000",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 16,
    lineHeight: 28,
    paddingLeft: 4,
  },
  durationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 32,
    gap: 0,
    width: "100%",
  },
  durationButton: {
    backgroundColor: "#F1F1F1",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  durationButtonSelected: {
    backgroundColor: "#89B697",
  },
  durationText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  durationTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  startButton: {
    backgroundColor: "#89B697",
    borderRadius: 100,
    width: "100%",
    minWidth: 260,
    maxWidth: 400,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    // marginHorizontal: 25,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
  },
});
