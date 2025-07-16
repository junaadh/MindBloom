import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import CustomModal from "./CustomModal";

type GoalModalProps = {
  visible: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  onAddGoal?: () => void;
  onCheckGoals?: () => void;
};

const GoalModal: React.FC<GoalModalProps> = ({
  visible,
  onClose,
  onAfterClose,
  onAddGoal,
  onCheckGoals,
}) => {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      onAfterClose={onAfterClose}
    >
      <View style={styles.centerColumn}>
        <Text style={styles.title}>Goals</Text>
        <TouchableOpacity
          style={styles.addGoalButton}
          onPress={onAddGoal}
          activeOpacity={0.8}
        >
          <View style={styles.addGoalInner}>
            <Text style={styles.addGoalText}>Add Goal</Text>
            <Text style={styles.plusIcon}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkGoalsButton}
          onPress={onCheckGoals}
          activeOpacity={0.8}
        >
          <Text style={styles.checkGoalsText}>View Goals</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  centerColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  } as ViewStyle,
  title: {
    fontFamily: "SF Pro",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
    width: 324,
    // height: 48, // Not a valid TextStyle property, removed
  } as TextStyle,
  addGoalButton: {
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    width: 367,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
  addGoalInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 271,
  } as ViewStyle,
  addGoalText: {
    fontFamily: "SF Pro",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
    marginRight: 12,
  } as TextStyle,
  plusIcon: {
    fontFamily: "SF Pro",
    fontSize: 32,
    lineHeight: 32,
    textAlign: "center",
    color: "#000",
    // marginLeft: 8,
  } as TextStyle,
  checkGoalsButton: {
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
  checkGoalsText: {
    fontFamily: "SF Pro",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
  } as TextStyle,
});

export default GoalModal;
