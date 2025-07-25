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

type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  onDelete?: () => void;
  onCancelDelete?: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onAfterClose,
  onDelete,
  onCancelDelete,
}) => {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      onAfterClose={onAfterClose}
    >
      <View style={styles.centerColumn}>
        <Text style={styles.title}>
          Are you sure you want to delete your account?
        </Text>
        <TouchableOpacity
          style={styles.checkDeletesButton}
          onPress={onCancelDelete}
          activeOpacity={0.8}
        >
          <View style={styles.addDeleteInner}>
            <Text style={styles.addDeleteText}>No</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addDeleteButton}
          onPress={onDelete}
          activeOpacity={0.8}
        >
          <Text style={styles.checkDeletesText}>Yes, I'm sure</Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: 700, fontSize: 12 }}>
          This action is permanent and irreversible
        </Text>
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
  addDeleteButton: {
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
  addDeleteInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 271,
  } as ViewStyle,
  addDeleteText: {
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
  checkDeletesButton: {
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
  checkDeletesText: {
    fontFamily: "SF Pro",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#000",
  } as TextStyle,
});

export default DeleteModal;
