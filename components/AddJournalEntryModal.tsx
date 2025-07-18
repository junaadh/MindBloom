import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomModal from "@/components/CustomModal";

const moods = ["Happy", "Sad", "Anxious", "Grateful"];

interface AddJournalEntryModalProps {
  visible: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

export default function AddJournalEntryModal({
  visible,
  onClose,
  onDiscard,
  onSave,
}: AddJournalEntryModalProps) {
  const [entry, setEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>New Entry</Text>

        <TextInput
          style={styles.textInput}
          placeholder="How are you feeling?"
          placeholderTextColor="#888"
          multiline
          value={entry}
          onChangeText={setEntry}
        />

        <View style={styles.moodGrid}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodButton,
                selectedMood === mood && styles.selectedMoodButton,
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Text
                style={[
                  styles.moodText,
                  selectedMood === mood && styles.selectedMoodText,
                ]}
              >
                {mood}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.discardButton} onPress={onClose}>
            <Text style={styles.buttonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    minHeight: 120,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    padding: 16,
    fontSize: 16,
    textAlignVertical: "top",
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  moodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#ececec",
  },
  selectedMoodButton: {
    backgroundColor: "#89b697",
  },
  moodText: {
    fontSize: 16,
    color: "#333",
  },
  selectedMoodText: {
    color: "#fff",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
  },
  discardButton: {
    flex: 1,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ECECEC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  saveButton: {
    flex: 1,
    height: 62,
    backgroundColor: "#89B697",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
});
