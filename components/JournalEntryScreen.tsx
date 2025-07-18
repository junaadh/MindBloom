import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

interface JournalEntryProp {
  day: string;
  date: string;
  time: string;
  mood: string;
  summary: string;
  detailed: string;
  onBack: () => void;
}

export default function JournalEntryScreen({
  day,
  date,
  time,
  mood,
  summary,
  detailed,
  onBack,
}: JournalEntryProp) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Journal</Text>
      </View>
      <Ionicons
        name="arrow-back"
        size={18}
        style={styles.backArrow}
        onPress={onBack}
      />
      <View style={styles.contentContainer}>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{day}</Text>
          <Text style={styles.dateText}>{", "}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={styles.moodContainer}>
          <Ionicons name="happy-outline" size={32} />
          <View style={styles.moodTextContainer}>
            <Text style={styles.timeText}>Mood</Text>
            <Text style={styles.dateText}>{mood}</Text>
          </View>
        </View>
        <View style={styles.moodContainer}>
          <Ionicons name="bulb-outline" size={32} />
          <View style={styles.moodTextContainer}>
            <Text style={styles.timeText}>Ai Summary</Text>
            <Text style={styles.dateText}>{`Tone: ${summary}`}</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            height: 5,
            marginVertical: 10,
          }}
        />
        <View>
          <Text style={{ marginVertical: 10, fontWeight: 500, fontSize: 18 }}>
            {detailed}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moodContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  moodTextContainer: {
    // flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    maxWidth: "50%",
    // alignItems: "center",
  },
  container: {
    flex: 1,
    width: 440,
    height: 956,
    backgroundColor: "#e0e7e2",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentContainer: {
    width: "80%",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    marginVertical: 30,
  },
  dateText: {
    fontWeight: 600,
    fontSize: 16,
  },
  timeText: {
    fontWeight: 400,
    fontSize: 16,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  backArrow: {
    position: "absolute",
    top: 110,
    left: 41,
  },
  titleRow: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
  },
  title2: {
    fontWeight: 600,
  },
});
