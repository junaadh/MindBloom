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

interface Goal {
  id: number;
  name: string;
  progress: number;
  kind: string;
}

// Dummy data for Goals
const goals: Goal[] = [
  {
    id: 1,
    name: "Gym everyday",
    progress: 0.69,
    kind: "exercise",
  },
  {
    id: 2,
    name: "Meditate everyday",
    progress: 0.6,
    kind: "meditation",
  },
];

const ICONS: Record<string, any> = {
  exercise: "barbell-outline",
  walk: "walk-outline",
  journal: "journal-outline",
  meditation: "heart-outline",
};

const get_icon = (goal: Goal) => {
  return <Ionicons name={ICONS[goal.kind]} size={16} color="black" />;
};

// Calculate total completion percentage
function getTotalProgress(goal: typeof goals) {
  if (!goal.length) return 0;
  const total = goal.reduce((sum, h) => sum + h.progress, 0);
  return total / goal.length;
}

interface GoalListProps {
  visible: boolean;
  onClose: () => void;
}

const GoalList: React.FC<GoalListProps> = ({ visible, onClose }) => {
  const totalProgress = useMemo(() => getTotalProgress(goals), []);

  return (
    <CustomModal visible={visible} onClose={onClose} style={styles.overlay}>
      {/* Title */}
      <Text style={styles.header}>Your Goals</Text>

      {/* Goal list label and close icon */}
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
        <Text style={styles.listTitle}>Goal list</Text>
        <View style={styles.dailyLabelContainer}>
          <Text style={styles.dailyLabel}>Daily</Text>
        </View>
      </View>

      {/* Goals List */}
      <ScrollView
        style={styles.GoalsScroll}
        contentContainerStyle={styles.GoalsList}
        showsVerticalScrollIndicator={false}
      >
        {goals.map((goal) => (
          <View key={goal.id} style={styles.GoalRow}>
            <DashedProgressRing
              progress={goal.progress}
              icon={get_icon(goal)}
              size={44}
              iconSize={16}
              totalSegments={12}
              activeColor="#89B697"
              inactiveColor="#ECECEC"
            />
            <View style={styles.GoalInfo}>
              <Text style={styles.GoalName}>{goal.name}</Text>
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
  GoalsScroll: {
    width: "100%",
    // maxHeight: 260,
    marginBottom: 12,
  },
  GoalsList: {
    paddingBottom: 10,
  },
  GoalRow: {
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
  GoalInfo: {
    flex: 1,
    marginLeft: 16,
  },
  GoalName: {
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

export default GoalList;
