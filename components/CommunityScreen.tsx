import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import ThreadView from "./ThreadView";

const FONT_FAMILY = Platform.OS === "ios" ? "SF Pro" : undefined;

export const AVATARS: Record<any, number> = {
  a1: require("../assets/images/profile_avatar.png"),
  c1: require("../assets/images/Community1.png"),
  c2: require("../assets/images/Community2.png"),
  c3: require("../assets/images/Community3.png"),
  c4: require("../assets/images/Community4.png"),
};

// types.ts
export interface Reply {
  id: string;
  author: string;
  authorId: number;
  timeAgo: string;
  text: string;
}

export interface ConversationProps {
  id: string;
  author: string;
  authorId: number;
  timeAgo: string;
  tag: string;
  text: string;
  replies: Reply[];
}

export const threadData: ConversationProps[] = [
  {
    id: "thread-1",
    author: "Sophia",
    authorId: AVATARS.a1,
    timeAgo: "2d",
    tag: "stress",
    text: "I've been feeling so overwhelmed lately with work and personal life. Any tips on how to manage stress and find some inner peace?",
    replies: [
      {
        id: "r1",
        author: "Anonymous",
        authorId: AVATARS.c1,
        timeAgo: "1d",
        text: "Try incorporating mindfulness exercises into your daily routine.",
      },
      {
        id: "r2",
        author: "Anonymous",
        authorId: AVATARS.c2,
        timeAgo: "1d",
        text: "I find journaling to be incredibly helpful.",
      },
      {
        id: "r3",
        author: "Anonymous",
        authorId: AVATARS.c3,
        timeAgo: "1d",
        text: "Setting boundaries is crucial. Learn to say no to commitments that drain your energy.",
      },
      {
        id: "r4",
        author: "Anonymous",
        authorId: AVATARS.c4,
        timeAgo: "1d",
        text: "Don't forget to prioritize self-care activities!",
      },
    ],
  },
  {
    id: "thread-2",
    author: "Anonymous",
    authorId: AVATARS.c2,
    timeAgo: "3d",
    tag: "Advice",
    text: "How do you deal with stress?",
    replies: [
      {
        id: "r5",
        author: "Anonymous",
        authorId: AVATARS.c1,
        timeAgo: "2d",
        text: "Meditation helps me a lot.",
      },
      {
        id: "r8",
        author: "Anonymous",
        authorId: AVATARS.c4,
        timeAgo: "23h",
        text: "Listening to calming music.",
      },
      {
        id: "r9",
        author: "Anonymous",
        authorId: AVATARS.c3,
        timeAgo: "20h",
        text: "Spending time with pets.",
      },
      {
        id: "r10",
        author: "Anonymous",
        authorId: AVATARS.c1,
        timeAgo: "18h",
        text: "Deep breathing exercises.",
      },
      {
        id: "r11",
        author: "Anonymous",
        authorId: AVATARS.c2,
        timeAgo: "16h",
        text: "Taking a short nap.",
      },
      {
        id: "r12",
        author: "Anonymous",
        authorId: AVATARS.c3,
        timeAgo: "14h",
        text: "Talking to a friend.",
      },
      {
        id: "r13",
        author: "Anonymous",
        authorId: AVATARS.c4,
        timeAgo: "12h",
        text: "Using a stress ball.",
      },
      {
        id: "r14",
        author: "Sophia",
        authorId: AVATARS.a1,
        timeAgo: "10h",
        text: "Thanks, I’ll try meditation.",
      },
    ],
  },
  {
    id: "thread-3",
    author: "Anonymous",
    authorId: AVATARS.c3,
    timeAgo: "5d",
    tag: "Motivation",
    text: "How do you stay motivated?",
    replies: [
      {
        id: "r16",
        author: "Anonymous",
        authorId: AVATARS.c2,
        timeAgo: "4d",
        text: "I reward myself after tasks.",
      },
      {
        id: "r17",
        author: "Anonymous",
        authorId: AVATARS.c3,
        timeAgo: "3d",
        text: "Having a vision board helps.",
      },
      {
        id: "r18",
        author: "Anonymous",
        authorId: AVATARS.c4,
        timeAgo: "3d",
        text: "Music boosts my mood.",
      },
      {
        id: "r19",
        author: "Anonymous",
        authorId: AVATARS.c2,
        timeAgo: "2d",
        text: "Planning the day beforehand.",
      },
      {
        id: "r20",
        author: "Anonymous",
        authorId: AVATARS.c1,
        timeAgo: "2d",
        text: "I follow inspiring creators.",
      },
      {
        id: "r21",
        author: "Anonymous",
        authorId: AVATARS.c2,
        timeAgo: "1d",
        text: "Accountability partners.",
      },
      {
        id: "r22",
        author: "Sophia",
        authorId: AVATARS.a1,
        timeAgo: "22h",
        text: "Goal tracking works well too.",
      },
      {
        id: "r23",
        author: "Anonymous",
        authorId: AVATARS.c3,
        timeAgo: "20h",
        text: "Daily affirmations.",
      },
      {
        id: "r24",
        author: "Anonymous",
        authorId: AVATARS.c4,
        timeAgo: "18h",
        text: "I take breaks when needed.",
      },
    ],
  },
  {
    id: "thread-5",
    author: "Sophia",
    authorId: AVATARS.a1,
    timeAgo: "2d",
    tag: "Mindfulness",
    text: "Tips to stay present in daily life",
    replies: [
      {
        id: "r35",
        author: "Anonymous",
        authorId: AVATARS.c1,
        timeAgo: "2d",
        text: "Avoid multitasking.",
      },
      {
        id: "r39",
        author: "Anonymous",
        authorId: AVATARS.c2,
        timeAgo: "22h",
        text: "Practice mindfulness.",
      },
      {
        id: "r40",
        author: "Anonymous",
        authorId: AVATARS.c1,
        timeAgo: "20h",
        text: "Use reminders to pause.",
      },
      {
        id: "r41",
        author: "Anonymous",
        authorId: AVATARS.c2,
        timeAgo: "18h",
        text: "Gratitude walk daily.",
      },
      {
        id: "r42",
        author: "Anonymous",
        authorId: AVATARS.c3,
        timeAgo: "16h",
        text: "Eat mindfully.",
      },
      {
        id: "r43",
        author: "Sophia",
        authorId: AVATARS.a1,
        timeAgo: "14h",
        text: "These are helpful!",
      },
      {
        id: "r44",
        author: "Anonymous",
        authorId: AVATARS.c4,
        timeAgo: "12h",
        text: "Stretch and check in.",
      },
    ],
  },
];

const THREADS = [
  {
    title: "Daily reflection",
    prompt: "Try reflecting today",
    desc: "Reflecting on your day can help you gain clarity and perspective.",
    img: require("../assets/images/reflect1.png"),
    dismissSvg: "back_arrow_2",
    viewText: "View",
    dismissText: "Dismiss",
  },
  {
    title: "Gratitude Prompt",
    prompt: "What are you grateful for?",
    desc: "Take time to appreciate the good things in your life.",
    img: require("../assets/images/reflect2.png"),
    dismissSvg: "back_arrow_3",
    viewText: "View",
    dismissText: "Dismiss",
  },
  {
    title: "New",
    prompt: "Take a short walk",
    desc: "A brief walk can help clear your mind and improve your mood.",
    img: require("../assets/images/reflect3.png"),
    dismissSvg: "back_arrow_2",
    viewText: "View",
    dismissText: "Dismiss",
  },
];

export default function CommunityScreen() {
  const [search, setSearch] = useState("");
  const [thread, setThread] = useState<ConversationProps | null>(null);

  return (
    <View style={styles.container}>
      {thread && (
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
          <ThreadView data={thread} onBack={() => setThread(null)} />
        </View>
      )}

      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Community</Text>
          <Ionicons name="person" size={24} />
        </View>

        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="search"
            placeholderTextColor="#808080"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
          <Ionicons name="search" size={24} />
        </View>

        {/* New Thread Button */}
        <TouchableOpacity style={styles.newThreadButton}>
          <Text style={styles.newThreadPlus}>+</Text>
          <Text style={styles.newThreadText}>New Thread</Text>
        </TouchableOpacity>

        {threadData.map((s) => (
          <TouchableOpacity
            style={styles.suggestionCard}
            key={s.text}
            onPress={() => setThread(s)}
          >
            <Image
              width={6}
              height={11}
              source={s.authorId}
              style={styles.suggestionArrow}
            />
            <View style={styles.suggestionTextContainer}>
              <Text style={styles.suggestionQuestion}>{s.text}</Text>
              <View style={styles.suggestionTagWrap}>
                <Text style={styles.suggestionReplies}>
                  {s.replies.length} replies
                </Text>
                <View style={styles.suggestionTag}>
                  <Text style={styles.suggestionTagText}>{s.tag}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {/* See More */}
        <TouchableOpacity style={styles.seeMoreRow}>
          <Text style={styles.seeMoreText}>{"See more >"}</Text>
        </TouchableOpacity>

        {/* Suggestions Section */}
        <Text style={styles.sectionTitle}>Suggestions</Text>
        {/* Map over threads */}
        {THREADS.map((thread, idx) => (
          <View style={styles.reflectionCard} key={thread.title + idx}>
            <View style={styles.reflectionTextContainer}>
              <View style={styles.reflectionTextWrap}>
                <Text style={styles.reflectionTitle}>{thread.title}</Text>
                <Text style={styles.reflectionPrompt}>{thread.prompt}</Text>
                <Text style={styles.reflectionDesc}>{thread.desc}</Text>
              </View>
              <View style={styles.reflectionButtonContainer}>
                <TouchableOpacity style={styles.reflectionViewButton}>
                  <Text style={styles.reflectionViewText}>
                    {thread.viewText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reflectionDismissButton}>
                  <Text style={styles.reflectionDismissText}>
                    {thread.dismissText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Image
              width={10}
              height={10}
              source={thread.img}
              style={styles.reflectionBackArrow}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const CARD_RADIUS = 30;
const TAG_RADIUS = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E7E2",
    paddingTop: 100,
    paddingBottom: 50,
  },
  scrollContent: {
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  inputField: {
    flexDirection: "row",
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 62,
    marginBottom: 16,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    fontSize: 32,
    color: "#000",
    lineHeight: 37,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    fontSize: 24,
    color: "#000",
    marginBottom: 12,
    marginTop: 24,
  },
  // suggestionRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginBottom: 13,
  //   gap: 13,
  // },
  suggestionCard: {
    flexDirection: "row",
    backgroundColor: "#ECECEC",
    borderRadius: CARD_RADIUS,
    padding: 5,
    marginRight: 0,
    // minHeight: 120,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 13,
  },
  suggestionReplies: {
    fontFamily: FONT_FAMILY,
    fontWeight: "300",
    fontSize: 14,
    color: "#000",
    opacity: 0.7,
  },
  suggestionQuestion: {
    fontFamily: FONT_FAMILY,
    fontWeight: "800",
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  suggestionTagWrap: {
    flexDirection: "row",
    gap: 16,
  },
  suggestionTag: {
    backgroundColor: "#89B697",
    borderRadius: TAG_RADIUS,
    justifyContent: "center",
    paddingHorizontal: 7,
  },
  suggestionTagText: {
    fontFamily: FONT_FAMILY,
    fontWeight: "400",
    fontSize: 12,
    color: "#000",
  },
  suggestionArrow: {
    width: 54,
    height: 54,
  },
  seeMoreRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 15,
    gap: 6,
  },
  seeMoreText: {
    fontFamily: FONT_FAMILY,
    fontWeight: "300",
    fontSize: 14,
    color: "#000",
    opacity: 0.7,
  },
  seeMoreArrow: {
    marginLeft: 4,
  },
  newThreadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#89B697",
    borderRadius: 119,
    width: 145,
    height: 39,
    alignSelf: "flex-end",
    justifyContent: "center",
    marginBottom: 11,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  newThreadPlus: {
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    fontSize: 20,
    color: "#000",
    marginRight: 8,
  },
  newThreadText: {
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  reflectionCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    padding: 18,
    marginBottom: 8,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  reflectionTextContainer: {
    flex: 1,
  },
  reflectionTextWrap: {
    flex: 1,
    width: "70%",
  },
  reflectionTitle: {
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    fontSize: 14,
    color: "#63877D",
    marginBottom: 4,
  },
  reflectionPrompt: {
    fontFamily: FONT_FAMILY,
    fontWeight: "800",
    fontSize: 16,
    color: "#000",
    marginBottom: 4,
  },
  reflectionDesc: {
    fontFamily: FONT_FAMILY,
    fontWeight: "300",
    fontSize: 12,
    color: "#000",
    opacity: 0.8,
  },
  reflectionButtonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  reflectionViewButton: {
    backgroundColor: "#89B697",
    borderRadius: 84,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  reflectionViewText: {
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
    marginRight: 6,
  },
  reflectionDismissButton: {
    backgroundColor: "#ECECEC",
    borderRadius: 84,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  reflectionDismissText: {
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    fontSize: 12,
    color: "#000",
    marginRight: 6,
  },
  reflectionBackArrow: {
    width: 114,
    height: 140,
  },
});
