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

type HabitModalProps = {
  visible: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  onAddHabit?: () => void;
  onCheckHabits?: () => void;
};

const HabitModal: React.FC<HabitModalProps> = ({
  visible,
  onClose,
  onAfterClose,
  onAddHabit,
  onCheckHabits,
}) => {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      onAfterClose={onAfterClose}
    >
      <View style={styles.centerColumn}>
        <Text style={styles.title}>Habits</Text>
        <TouchableOpacity
          style={styles.addHabitButton}
          onPress={onAddHabit}
          activeOpacity={0.8}
        >
          <View style={styles.addHabitInner}>
            <Text style={styles.addHabitText}>Add habit</Text>
            <Text style={styles.plusIcon}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkHabitsButton}
          onPress={onCheckHabits}
          activeOpacity={0.8}
        >
          <Text style={styles.checkHabitsText}>Check habits</Text>
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
  addHabitButton: {
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
  addHabitInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 271,
  } as ViewStyle,
  addHabitText: {
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
  checkHabitsButton: {
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
  checkHabitsText: {
    fontFamily: "SF Pro",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
  } as TextStyle,
});

export default HabitModal;
