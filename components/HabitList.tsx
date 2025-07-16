import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomModal from "./CustomModal";
import DashedProgressRing from "./DashedProgressRing";
import { Ionicons } from "@expo/vector-icons";

interface Habit {
  id: number;
  name: string;
  progress: number;
  kind: string;
}

// Dummy data for habits
const HABITS: Habit[] = [
  {
    id: 1,
    name: "Exercise for one hour",
    progress: 0.8,
    kind: "exercise",
  },
  {
    id: 2,
    name: "Walk for one hour",
    progress: 0.6,
    kind: "walk",
  },
  {
    id: 3,
    name: "Journal for 30 minutes",
    progress: 1,
    kind: "journal",
  },
  {
    id: 4,
    name: "Meditate for 15 minutes",
    progress: 0.3,
    kind: "meditation",
  },
];

const ICONS: Record<string, any> = {
  exercise: "barbell-outline",
  walk: "walk-outline",
  journal: "journal-outline",
  meditation: "heart-outline",
};

const get_icon = (habit: Habit) => {
  return <Ionicons name={ICONS[habit.kind]} size={16} color="black" />;
};

// Calculate total completion percentage
function getTotalProgress(habits: typeof HABITS) {
  if (!habits.length) return 0;
  const total = habits.reduce((sum, h) => sum + h.progress, 0);
  return total / habits.length;
}

interface HabitListProps {
  visible: boolean;
  onClose: () => void;
}

const HabitList: React.FC<HabitListProps> = ({ visible, onClose }) => {
  const totalProgress = useMemo(() => getTotalProgress(HABITS), []);

  return (
    <CustomModal visible={visible} onClose={onClose} style={styles.overlay}>
      {/* Title */}
      <Text style={styles.header}>Your Habits</Text>

      {/* Habit list label and close icon */}
      <View style={styles.listHeader}>
        <Text style={styles.todayText}>Today</Text>
      </View>

      {/* Total Progress Bar */}
      <View style={styles.totalProgressContainer}>
        <View style={styles.totalProgressTextContainer}>
          <Text style={styles.totalProgressText}>
            {Math.round(totalProgress * 100)}% Complete
          </Text>
        </View>
        <View style={styles.totalProgressBarBg}>
          <View
            style={[
              styles.totalProgressBarFill,
              { width: `${Math.round(totalProgress * 100)}%` },
            ]}
          />
        </View>
      </View>

      {/* Daily label and calendar icon */}
      <View style={styles.dailyRow}>
        <Text style={styles.listTitle}>Habit list</Text>
        <View style={styles.dailyLabelContainer}>
          <Text style={styles.dailyLabel}>Daily</Text>
        </View>
      </View>

      {/* Habits List */}
      <ScrollView
        style={styles.habitsScroll}
        contentContainerStyle={styles.habitsList}
        showsVerticalScrollIndicator={false}
      >
        {HABITS.map((habit) => (
          <View key={habit.id} style={styles.habitRow}>
            <DashedProgressRing
              progress={habit.progress}
              icon={get_icon(habit)}
              size={44}
              iconSize={16}
              totalSegments={12}
              activeColor="#89B697"
              inactiveColor="#ECECEC"
            />
            <View style={styles.habitInfo}>
              <Text style={styles.habitName}>{habit.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={onClose}>
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    // width: 370,
    minHeight: 600,
  },
  header: {
    fontFamily: "SF Pro",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    // marginTop: 10,
    marginBottom: 30,
    color: "#000",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    marginBottom: 24,
    marginLeft: 18,
  },
  listTitle: {
    fontFamily: "SF Pro",
    fontWeight: "900",
    fontSize: 16,
    color: "#000",
  },
  totalProgressContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  totalProgressBarBg: {
    width: "90%",
    height: 8,
    borderRadius: 100,
    backgroundColor: "#ECECEC",
    overflow: "hidden",
    // marginBottom: 6,
  },
  totalProgressBarFill: {
    height: 8,
    borderRadius: 100,
    backgroundColor: "#89B697",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  totalProgressTextContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    // marginBottom: 18,
  },
  totalProgressText: {
    fontFamily: "SF Pro",
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
    // marginBottom: 2,
  },
  todayText: {
    fontFamily: "SF Pro",
    fontWeight: "900",
    fontSize: 16,
    color: "#000",
    opacity: 0.7,
    marginBottom: 2,
  },
  habitsScroll: {
    width: "100%",
    // maxHeight: 260,
    marginBottom: 12,
  },
  habitsList: {
    paddingBottom: 10,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 12,
    // width: 340,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  habitInfo: {
    flex: 1,
    marginLeft: 16,
  },
  habitName: {
    fontFamily: "SF Pro",
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
    textAlign: "left",
  },
  dailyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  dailyLabelContainer: {
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  dailyLabel: {
    fontFamily: "SF Pro",
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },
  calendarIcon: {
    fontSize: 20,
    color: "#000",
    opacity: 0.7,
  },
  continueBtn: {
    backgroundColor: "#89B697",
    borderRadius: 100,
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 18,
    marginBottom: 8,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  continueBtnText: {
    fontFamily: "SF Pro",
    fontWeight: "600",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
});

export default HabitList;
