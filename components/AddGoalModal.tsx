import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import CustomModal from "./CustomModal";

import type { ViewStyle, TextStyle } from "react-native";
import Animated from "react-native-reanimated";

type Frequency = "Daily" | "Weekly" | "Monthly";

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  onSave: (Goal: {
    name: string;
    reminder: string;
    frequency: Frequency;
  }) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({
  visible,
  onClose,
  onAfterClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [reminder, setReminder] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("Daily");

  const handleSave = () => {
    if (name.trim()) {
      setName("");
      setReminder("");
      setFrequency("Daily");
    }
    onSave({ name, reminder, frequency });
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      onAfterClose={onAfterClose}
    >
      <Text style={styles.title}>New Goal</Text>

      <Text style={styles.label}>Goal name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="e.g., Exercise"
          placeholderTextColor="#808080"
          value={name}
          onChangeText={setName}
        />
      </View>

      <Text style={styles.label}>Reminders</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Remind me"
          placeholderTextColor="#808080"
          value={reminder}
          onChangeText={setReminder}
        />
        <Text style={styles.reminderTime}>10:00 AM</Text>
        {/* You can add a time picker here if needed */}
      </View>

      <Text style={styles.label}>Frequency</Text>
      <View style={styles.frequencySelector}>
        <View style={styles.frequencyWrapper}>
          <Animated.View
            style={[
              styles.frequencySlidingBackground,
              {
                transform: [
                  {
                    translateX:
                      frequency === "Daily"
                        ? 0
                        : frequency === "Weekly"
                        ? 138
                        : 276,
                  },
                ],
              },
            ]}
          />
          {(["Daily", "Weekly", "Monthly"] as Frequency[]).map((freq) => (
            <TouchableOpacity
              key={freq}
              style={styles.frequencyButton}
              onPress={() => setFrequency(freq)}
            >
              <Text
                style={[
                  styles.frequencyText,
                  frequency === freq && styles.frequencyTextActive,
                ]}
              >
                {freq}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    width: 415,
    paddingHorizontal: 24,
    paddingTop: 32,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 13,
    elevation: 8,
  } as ViewStyle,
  frequencySelector: {
    marginTop: 12,
    marginBottom: 18,
    marginHorizontal: 0,
  } as ViewStyle,
  frequencyWrapper: {
    flexDirection: "row",
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 38,
    position: "relative",
    overflow: "hidden",
  } as ViewStyle,
  frequencySlidingBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 138,
    height: 38,
    backgroundColor: "#fff",
    borderRadius: 100,
    zIndex: 0,
    elevation: 2,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  } as ViewStyle,
  frequencyButton: {
    flex: 1,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  } as ViewStyle,
  frequencyText: {
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontSize: 16,
    color: "#808080",
    fontWeight: "600",
  } as TextStyle,
  frequencyTextActive: {
    color: "#000",
    fontWeight: "700",
  } as TextStyle,
  title: {
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
  } as TextStyle,
  label: {
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
    marginTop: 8,
    alignSelf: "flex-start",
  } as TextStyle,
  inputContainer: {
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    width: "100%",
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
  input: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontWeight: "400",
    fontSize: 16,
    color: "#000",
    paddingVertical: 12,
    paddingHorizontal: 0,
  } as TextStyle,
  reminderTime: {
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontWeight: "400",
    fontSize: 16,
    color: "#808080",
    marginLeft: 12,
  } as TextStyle,
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
    marginTop: 8,
    gap: 10,
  } as ViewStyle,
  // frequencyButton: {
  //   backgroundColor: "#ECECEC",
  //   borderRadius: 100,
  //   paddingVertical: 10,
  //   paddingHorizontal: 24,
  //   minWidth: 80,
  //   alignItems: "center",
  //   shadowColor: "#5B5B5B",
  //   shadowOffset: { width: 2, height: 1 },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 2,
  //   elevation: 1,
  // } as ViewStyle,
  frequencyButtonActive: {
    backgroundColor: "#89B697",
  } as ViewStyle,
  // frequencyText: {
  //   fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
  //   fontSize: 14,
  //   color: "#121714",
  //   textAlign: "center",
  // } as TextStyle,
  // frequencyTextActive: {
  //   color: "#fff",
  //   fontWeight: "700",
  // } as TextStyle,
  saveButton: {
    backgroundColor: "#89B697",
    borderRadius: 100,
    width: 367,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
  saveButtonText: {
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
  } as TextStyle,
});

export default AddGoalModal;
