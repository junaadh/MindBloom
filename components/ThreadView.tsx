import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AVATARS } from "./CommunityScreen";

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

interface ThreadViewProps {
  data: ConversationProps;
  onBack?: () => void;
}

export default function ThreadView({ data, onBack }: ThreadViewProps) {
  const [reply, setReply] = useState("");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="#121714" />
        </TouchableOpacity>
        <Text style={styles.title}>Thread</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Post */}
        <View style={styles.mainPostRow}>
          <View style={styles.avatarWrap}>
            <Image
              width={10}
              height={10}
              source={data.authorId}
              style={styles.avatarPlaceholder}
            />
          </View>
          <View style={styles.mainPostContent}>
            <Text style={styles.authorName}>{data.author}</Text>
            <Text style={styles.timeAgo}>{data.timeAgo}</Text>
            <Text style={styles.mainPostText}>{data.text}</Text>
          </View>
        </View>

        {/* Replies */}
        {data.replies.map((reply) => (
          <View key={reply.id} style={styles.replyRow}>
            <View style={styles.avatarWrap}>
              <Image
                width={10}
                height={10}
                source={reply.authorId}
                style={styles.avatarPlaceholder}
              />
            </View>
            <View style={styles.replyContent}>
              <Text style={styles.authorName}>{reply.author}</Text>
              <Text style={styles.timeAgo}>{reply.timeAgo}</Text>
              <Text style={styles.replyText}>{reply.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Reply Button */}
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.avatarWrap}>
            <Image
              width={10}
              height={10}
              source={AVATARS.a1}
              style={styles.avatarPlaceholder}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              placeholder="Reply anonymously"
              placeholderTextColor="#808080"
              value={reply}
              onChangeText={setReply}
              autoCapitalize="none"
            />
          </View>
        </View>
        {reply.trim().length !== 0 && (
          <TouchableOpacity
            style={styles.replyButton}
            onPress={() => setReply("")}
          >
            <Text style={styles.replyButtonText}>Reply anonymously</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 75,
    backgroundColor: "#E0E7E2",
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  backArrow: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  mainPostRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  avatarWrap: {
    width: 54,
    height: 54,
    borderRadius: 100,
    backgroundColor: "#ECECEC",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 100,
    backgroundColor: "#D1E0D6",
  },
  mainPostContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  authorName: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 2,
    color: "#000",
  },
  timeAgo: {
    fontSize: 12,
    color: "#000",
    opacity: 0.6,
    marginBottom: 4,
  },
  mainPostText: {
    fontSize: 13,
    color: "#000",
    lineHeight: 18,
  },
  replyRow: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 54 + 12, // indent replies
  },
  replyContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  replyText: {
    fontSize: 13,
    color: "#000",
    lineHeight: 18,
  },
  footer: {
    flex: 1,
    width: "95%",
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
  },
  replyButton: {
    height: 54,
    backgroundColor: "#89B697ef",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  replyButtonText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000000",
  },
  inputField: {
    flex: 1,
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    height: 62,
    marginBottom: 16,
    paddingHorizontal: 24,
    justifyContent: "center",
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
});
