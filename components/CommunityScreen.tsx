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
import { SvgUri } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const FONT_FAMILY = Platform.OS === "ios" ? "SF Pro" : undefined;

const SUGGESTIONS = [
  {
    replies: 12,
    question: "How do you deal with stress?",
    tag: "Stress",
    avatar: require("../assets/images/Community1.png"),
  },
  {
    replies: 9,
    question: "How do you stay motivated?",
    tag: "Motivation",
    avatar: require("../assets/images/Community2.png"),
  },
  {
    replies: 7,
    question: "How do you practice gratitude?",
    tag: "Gratitude",
    avatar: require("../assets/images/Community3.png"),
  },
  {
    replies: 8,
    question: "Tips to stay present in daily life",
    tag: "Mindfulness",
    avatar: require("../assets/images/Community4.png"),
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

  return (
    <View style={styles.container}>
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

        {SUGGESTIONS.map((s) => (
          <View style={styles.suggestionCard} key={s.question}>
            <Image
              width={6}
              height={11}
              source={s.avatar}
              style={styles.suggestionArrow}
            />
            <View style={styles.suggestionTextContainer}>
              <Text style={styles.suggestionQuestion}>{s.question}</Text>
              <View style={styles.suggestionTagWrap}>
                <Text style={styles.suggestionReplies}>
                  {s.replies} replies
                </Text>
                <View style={styles.suggestionTag}>
                  <Text style={styles.suggestionTagText}>{s.tag}</Text>
                </View>
              </View>
            </View>
          </View>
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

const CARD_RADIUS = 100;
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
