import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

const JOURNAL_ENTRIES = [
  {
    id: "today-1",
    date: "Today",
    time: "10:32 AM",
    mood: "Grateful",
    content: "I’m feeling grateful for the great things in life today.",
    icon: "📝",
  },
  {
    id: "yesterday-1",
    date: "Yesterday",
    time: "20:45 PM",
    mood: "Celebrating a small victory",
    content:
      "I presented a business pitch in front of a huge crowd. Everything went well.",
    icon: "🎉",
  },
  {
    id: "yesterday-2",
    date: "Yesterday",
    time: "16:15 PM",
    mood: "Energized",
    content: "I had a great workout and feeling energized.",
    icon: "💪",
  },
];

const groupEntriesByDate = (entries: typeof JOURNAL_ENTRIES) => {
  const grouped: { [date: string]: typeof JOURNAL_ENTRIES } = {};
  entries.forEach((entry) => {
    if (!grouped[entry.date]) grouped[entry.date] = [];
    grouped[entry.date].push(entry);
  });
  return grouped;
};

const groupedEntries = groupEntriesByDate(JOURNAL_ENTRIES);

const JournalScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Journal</Text>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(groupedEntries).map(([date, entries]) => (
            <View key={date}>
              <Text style={styles.sectionTitle}>{date}</Text>
              {entries.map((entry) => (
                <View style={styles.cardRow} key={entry.id}>
                  <View style={styles.card}>
                    <View style={styles.cardIconWrap}>
                      <Text style={styles.cardIcon}>{entry.icon}</Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardMood}>{entry.mood}</Text>
                      <Text style={styles.cardText}>{entry.content}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardTime}>{entry.time}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E0E7E2",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    backgroundColor: "#E0E7E2",
    minHeight: "100%",
  },
  header: {
    fontFamily: "SF Pro",
    fontWeight: "700",
    fontSize: 32,
    color: "#000",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  scroll: {
    width: "100%",
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontFamily: "SF Pro",
    fontWeight: "900",
    fontSize: 16,
    color: "#000",
    marginTop: 18,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    padding: 18,
    flex: 1,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIconWrap: {
    width: 43,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardIcon: {
    fontSize: 36,
    color: "#000",
    opacity: 0.8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardMood: {
    fontFamily: "SF Pro",
    fontWeight: "900",
    fontSize: 16,
    color: "#000",
    marginBottom: 4,
  },
  cardText: {
    fontFamily: "SF Pro",
    fontWeight: "400",
    fontSize: 14,
    color: "#000",
    opacity: 0.85,
    lineHeight: 20,
  },
  cardTime: {
    fontFamily: "SF Pro",
    fontWeight: "400",
    fontSize: 13,
    color: "#000",
    opacity: 0.7,
    marginLeft: 10,
    marginTop: 12,
    minWidth: 70,
    textAlign: "right",
  },
});

export default JournalScreen;
