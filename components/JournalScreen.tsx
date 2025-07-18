import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import JournalEntryScreen from "./JournalEntryScreen";
import AddJournalEntryModal from "./AddJournalEntryModal";

interface JournalEntry {
  id: string;
  date: string;
  day: string;
  extendedDate: string;
  time: string;
  mood: string;
  content: string;
  icon: string;
  summary: string;
  detailed: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "today-1",
    date: "Today",
    day: "Thursday",
    extendedDate: "July 17, 2025",
    time: "10:32 AM",
    mood: "Grateful",
    content: "I’m feeling grateful for the great things in life today.",
    icon: "📝",
    summary: "Positive",
    detailed:
      "I’m feeling grateful for the great things in life today. It's important to pause and appreciate what I have.",
  },
  {
    id: "yesterday-1",
    date: "Yesterday",
    day: "Wednesday",
    extendedDate: "July 16, 2025",
    time: "20:45 PM",
    mood: "Celebrating a small victory",
    content:
      "I presented a business pitch in front of a huge crowd. Everything went well.",
    icon: "🎉",
    summary: "Confident",
    detailed:
      "I presented a business pitch in front of a huge crowd. Everything went well. I was nervous but pushed through and I'm proud of myself.",
  },
  {
    id: "yesterday-2",
    date: "Yesterday",
    day: "Wednesday",
    extendedDate: "July 16, 2025",
    time: "16:15 PM",
    mood: "Energized",
    content: "I had a great workout and feeling energized.",
    icon: "💪",
    summary: "Fulfilled",
    detailed:
      "I had a great workout and feeling energized. It reminded me how movement clears my mind and fuels my motivation.",
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
  const [showEntry, setShowEntry] = useState<JournalEntry | null>(null);

  const [showAddEntryModal, setShowAddEntryModal] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <AddJournalEntryModal
        visible={showAddEntryModal}
        onClose={() => setShowAddEntryModal(false)}
        onSave={() => setShowAddEntryModal(false)}
        onDiscard={() => setShowAddEntryModal}
      />

      {showEntry && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.4)", // add a dimmed background
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setShowEntry(null)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <JournalEntryScreen
            day={showEntry.day}
            date={showEntry.extendedDate}
            time={showEntry.time}
            mood={showEntry.mood}
            summary={showEntry.summary}
            detailed={showEntry.detailed}
            onBack={() => setShowEntry(null)}
          />
        </View>
      )}
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
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => setShowEntry(entry)}
                  >
                    <View style={styles.cardIconWrap}>
                      <Text style={styles.cardIcon}>{entry.icon}</Text>
                    </View>
                    <View style={styles.cardContent}>
                      <View style={styles.cardTimeWrap}>
                        <Text style={styles.cardMood}>{entry.mood}</Text>
                        <Text style={styles.cardTime}>{entry.time}</Text>
                      </View>
                      <Text style={styles.cardText}>{entry.content}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.newEntryContainer}
        onPress={() => setShowAddEntryModal(true)}
      >
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <Text style={styles.newEntryText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    justifyContent: "center",
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
    width: 46,
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
  cardTimeWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    // marginLeft: 10,
    // marginTop: 12,
    // minWidth: 70,
    // textAlign: "right",
  },
  newEntryContainer: {
    position: "absolute",
    flex: 1,
    top: 793,
    left: 315,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    overflow: "hidden",
    shadowColor: "#ffffff",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  newEntryText: {
    fontSize: 30,
  },
});

export default JournalScreen;
