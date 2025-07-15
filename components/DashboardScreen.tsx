import React, { useState } from "react";
import MeditationModal from "./MeditationModal";
import MeditationPlayer from "./MeditationPlayer";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import TaskBar, { TabType } from "./TaskBar";
import { Ionicons } from "@expo/vector-icons";

interface DashboardScreenProps {
  onTabPress?: (tab: TabType) => void;
}

// Dummy mood data matching Figma design - multiple values per day for smooth curve
// Get current month and generate month labels

// Dummy mood data matching Figma design - multiple values per day
type MoodData = { label: string; values: number[] };

const weeklyMoodData: MoodData[] = [
  { label: "Mon", values: [7.2, 7.4, 7.6, 7.3] },
  { label: "Tue", values: [7.0, 6.8, 6.5, 6.9] },
  { label: "Wed", values: [6.8, 7.0, 7.2, 7.1] },
  { label: "Thu", values: [6.5, 6.2, 6.0, 6.3] },
  { label: "Fri", values: [6.0, 5.8, 6.2, 6.4] },
  { label: "Sat", values: [6.8, 7.5, 7.8, 7.6] },
  { label: "Sun", values: [7.4, 7.2, 7.0, 7.3] },
];

// Monthly mood data - 7 months before current month
const monthlyMoodData: MoodData[] = [
  { label: "Jun", values: [6.8, 7.0, 7.2, 7.1, 6.9] },
  { label: "Jul", values: [7.1, 7.3, 7.5, 7.2, 7.4] },
  { label: "Aug", values: [6.9, 7.1, 7.3, 7.0, 7.2] },
  { label: "Sep", values: [6.5, 6.8, 7.0, 6.7, 6.9] },
  { label: "Oct", values: [6.2, 6.5, 6.8, 6.3, 6.6] },
  { label: "Nov", values: [6.8, 7.2, 7.5, 7.1, 7.3] },
  { label: "Dec", values: [7.0, 7.3, 7.6, 7.2, 7.4] },
];

// Calculate average for dynamic display
const calculateAverage = (data: MoodData[]) => {
  const allValues = data.flatMap((item) => item.values);
  const sum = allValues.reduce((acc: number, value: number) => acc + value, 0);
  return (sum / allValues.length).toFixed(1);
};

// Create smooth curve points using interpolation
const createSmoothCurve = (points: { x: number; y: number }[]) => {
  if (points.length < 2) return [];

  const smoothPoints = [];
  const tension = 0.5;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[i + 1];

    const steps = 20;
    for (let t = 0; t <= steps; t++) {
      const tt = t / steps;
      const ttt = tt * tt;
      const tttt = ttt * tt;

      const x =
        tension *
        (2 * p1.x +
          (-p0.x + p2.x) * tt +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * ttt +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * tttt);

      const y =
        tension *
        (2 * p1.y +
          (-p0.y + p2.y) * tt +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * ttt +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * tttt);

      smoothPoints.push({ x, y });
    }
  }

  return smoothPoints;
};

// Calculate percentage change (comparing last 3 days vs first 3 days)
const calculatePercentageChange = (data: MoodData[]) => {
  const firstHalf = data.slice(0, 3).flatMap((item) => item.values);
  const lastHalf = data.slice(-3).flatMap((item) => item.values);
  const firstAvg =
    firstHalf.reduce((acc: number, val: number) => acc + val, 0) /
    firstHalf.length;
  const lastAvg =
    lastHalf.reduce((acc: number, val: number) => acc + val, 0) /
    lastHalf.length;
  return (((lastAvg - firstAvg) / firstAvg) * 100).toFixed(1);
};

export default function DashboardScreen({ onTabPress }: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [selectedPeriod, setSelectedPeriod] = useState<"weekly" | "monthly">(
    "weekly",
  );
  const [slideAnimation] = useState(new Animated.Value(0));
  const [showMeditationModal, setShowMeditationModal] = useState(false);
  const [showMeditationPlayer, setShowMeditationPlayer] = useState(false);
  const [meditationMinutes, setMeditationMinutes] = useState<number | null>(
    null,
  );

  // Get current data based on selected period
  const getCurrentData = () => {
    return selectedPeriod === "weekly" ? weeklyMoodData : monthlyMoodData;
  };

  const handlePeriodChange = (period: "weekly" | "monthly") => {
    setSelectedPeriod(period);
    Animated.timing(slideAnimation, {
      toValue: period === "weekly" ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
    onTabPress?.(tab);
  };

  const handleStartMeditation = () => {
    setShowMeditationModal(true);
  };

  const handleMeditationStart = (duration: number) => {
    setShowMeditationModal(false);
    setMeditationMinutes(duration);
    setShowMeditationPlayer(true);
  };

  const handleMeditationPlayerBack = () => {
    setShowMeditationPlayer(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <MeditationModal
        visible={showMeditationModal}
        onClose={() => setShowMeditationModal(false)}
        onStart={handleMeditationStart}
      />

      {showMeditationPlayer && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          {/* Modal-like overlay for MeditationPlayer */}
          <MeditationPlayer
            onBack={handleMeditationPlayerBack}
            minutes={meditationMinutes ?? 1}
          />
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!showMeditationModal}
      >
        {/* Today Header */}
        <View style={styles.todayHeader}>
          <Text style={styles.todayText}>Today</Text>
        </View>

        {/* Time Period Selector */}
        <View style={styles.timePeriodSelector}>
          <View style={styles.periodWrapper}>
            <Animated.View
              style={[
                styles.slidingBackground,
                {
                  transform: [
                    {
                      translateX: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 196], // Move by sliding background width
                      }),
                    },
                  ],
                },
              ]}
            />
            <TouchableOpacity
              style={styles.periodButton}
              onPress={() => handlePeriodChange("weekly")}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === "weekly" && styles.activePeriodButtonText,
                ]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.periodButton}
              onPress={() => handlePeriodChange("monthly")}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === "monthly" && styles.activePeriodButtonText,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mood Summary Card */}
        <View style={styles.moodSummaryCard}>
          {/* Header Row */}
          <View style={styles.moodSummaryHeaderRow}>
            <Text style={styles.moodSummaryTitle}>Mood Summary</Text>
            <Text style={styles.thisWeekText}>
              {selectedPeriod === "weekly" ? "This week" : "This month"}
            </Text>
          </View>

          {/* Score and Percentage Row */}
          <View style={styles.moodScoreRow}>
            <Text style={styles.moodScore}>
              {calculateAverage(getCurrentData())}
            </Text>
            <View style={styles.moodChangeRow}>
              <Ionicons
                name="arrow-up"
                size={14}
                color="#63877D"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.moodChange}>
                {calculatePercentageChange(getCurrentData())}%
              </Text>
            </View>
          </View>

          {/* Mood Graph Area */}
          <View style={styles.moodGraphContainer}>
            <LinearGradient
              colors={["transparent", "transparent"]}
              style={{ width: 358, height: 148, borderRadius: 8 }}
            />
            <View style={styles.graphOverlay}>
              {/* Smooth curve with gradient fill */}
              {(() => {
                const points: { x: number; y: number }[] = [];
                const currentData = getCurrentData();

                currentData.forEach((period, periodIndex) => {
                  period.values.forEach((value, valueIndex) => {
                    const minMood = 5.5;
                    const maxMood = 8.0;
                    const periodWidth = 358 / currentData.length;
                    const valueSpacing =
                      periodWidth / (period.values.length + 1);
                    const x =
                      periodIndex * periodWidth +
                      (valueIndex + 1) * valueSpacing;
                    const y =
                      20 + (1 - (value - minMood) / (maxMood - minMood)) * 108;
                    points.push({ x, y });
                  });
                });

                const smoothPoints = createSmoothCurve(points);

                return (
                  <View style={styles.curveContainer}>
                    {/* Create area fill only in elevated curve areas (hills) */}
                    <View style={styles.areaFillContainer}>
                      {/* Create filled triangles between consecutive points */}
                      {smoothPoints.map((point, i) => {
                        if (i === smoothPoints.length - 1) return null;
                        const nextPoint = smoothPoints[i + 1];
                        const baselineY = 110; // Baseline level for determining hills vs dips

                        // Only show fill if both points are above baseline (hills)
                        if (point.y > baselineY && nextPoint.y > baselineY) {
                          return null; // Skip dips below baseline
                        }

                        // Create triangle vertices
                        const width = nextPoint.x - point.x;
                        const fillBaseY = Math.max(
                          baselineY,
                          Math.max(point.y, nextPoint.y),
                        );

                        return (
                          <View
                            key={"area-" + i}
                            style={styles.triangleContainer}
                          >
                            {/* Bottom rectangle */}
                            <View
                              style={[
                                styles.bottomFill,
                                {
                                  left: point.x,
                                  top: fillBaseY,
                                  width: width,
                                  height: baselineY - fillBaseY,
                                },
                              ]}
                            />
                            {/* Top triangle to complete the shape */}
                            <View
                              style={[
                                styles.topFill,
                                {
                                  left: point.x,
                                  top: Math.min(point.y, nextPoint.y),
                                  width: width,
                                  height:
                                    fillBaseY - Math.min(point.y, nextPoint.y),
                                },
                              ]}
                            />
                          </View>
                        );
                      })}
                    </View>

                    {/* Gradient overlay for fade effect */}
                    <View style={styles.gradientOverlay} />

                    {/* Curve line */}
                    {smoothPoints.map((point, i) => {
                      if (i === smoothPoints.length - 1) return null;
                      const nextPoint = smoothPoints[i + 1];
                      const length = Math.sqrt(
                        (nextPoint.x - point.x) ** 2 +
                          (nextPoint.y - point.y) ** 2,
                      );
                      const angle =
                        Math.atan2(
                          nextPoint.y - point.y,
                          nextPoint.x - point.x,
                        ) *
                        (180 / Math.PI);

                      return (
                        <View
                          key={`curve-${i}`}
                          style={[
                            styles.curveLine,
                            {
                              width: length,
                              left: point.x,
                              top: point.y,
                              transform: [{ rotate: `${angle}deg` }],
                              backgroundColor: "#89B697",
                            },
                          ]}
                        />
                      );
                    })}
                  </View>
                );
              })()}
            </View>

            {/* Period Labels */}
            <View style={styles.daysContainer}>
              {getCurrentData().map((d) => (
                <Text key={d.label} style={styles.dayText}>
                  {d.label}
                </Text>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.backArrow}>
            <Ionicons name="chevron-back" size={9} color="#63877D" />
          </TouchableOpacity>
        </View>

        {/* Calm Card */}
        <View style={styles.calmCard}>
          <Image
            source={require("../assets/images/calm_card.png")}
            style={styles.calmImagePlaceholder as any}
            resizeMode="cover"
          />
          <Text style={styles.calmTitle}>You seem calmer this week</Text>
          <Text style={styles.calmDescription}>
            Your mood has been more stable and positive. Keep up the great work!
          </Text>
        </View>

        {/* Habit Streak Header */}
        <View style={styles.habitStreakHeader}>
          <Text style={styles.sectionTitle}>Habit Streak</Text>
        </View>

        {/* Morning Journal Card */}
        <View style={styles.morningJournalCard}>
          <View style={styles.journalIconContainer}>
            <Image
              source={require("../assets/images/journal_icon_main.png")}
              style={styles.journalIcon as any}
              resizeMode="contain"
            />
          </View>
          <View style={styles.journalContent}>
            <Text style={styles.journalTitle}>Morning Journal</Text>
            <Text style={styles.journalStreak}>3 day streak</Text>
          </View>
          <Image
            source={require("../assets/images/journal_icon_arrow.png")}
            style={styles.journalArrow as any}
            resizeMode="contain"
          />
        </View>

        {/* Quick Actions Header */}
        <View style={styles.quickActionsHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        {/* Cards Flexbox Container */}
        <View style={styles.cardsFlexContainer}>
          {/* Meditate Card */}
          <View style={styles.meditateCard}>
            <View style={styles.actionContentFlex}>
              <Text style={styles.actionTitle}>Meditate</Text>
              <Text style={styles.actionDescription}>
                Take a moment to pause and breathe.
              </Text>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleStartMeditation}
                disabled={showMeditationModal}
              >
                <Text style={styles.actionButtonText}>Start meditation</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mood Check-in Card */}
          <View style={styles.moodCheckCard}>
            <View style={styles.actionContentFlex}>
              <Text style={styles.actionTitle}>Mood Check-in</Text>
              <Text style={styles.actionDescription}>
                Track your emotional well-being over time.
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>
                  View today&apos;s mood
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Habits Card */}
          <View style={styles.habitsCard}>
            <View style={styles.actionContentFlex}>
              <Text style={styles.actionTitle}>Habits</Text>
              <Text style={styles.actionDescription}>
                Build routines that support your well-being. Add new habits and
                track your progress every day.
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Manage habits</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Goals Card */}
          <View style={styles.goalsCard}>
            <View style={styles.actionContentFlex}>
              <Text style={styles.actionTitle}>Goals</Text>
              <Text style={styles.actionDescription}>
                Create goals that align with your well-being habits and journey.
                Keep track and grow at your pace.
              </Text>
              <Text style={styles.goalStreak}>7 day streak</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Manage goals</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Export Data Button */}
          <TouchableOpacity style={styles.exportButtonWide}>
            <Text style={styles.exportButtonText}>Export data</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding for taskbar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed TaskBar */}
      {!showMeditationModal && !showMeditationPlayer && (
        <View style={styles.taskBarContainer}>
          <TaskBar activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E7E2",
  } as ViewStyle,

  actionContentFlex: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
  } as ViewStyle,

  graphGradient: {
    width: 358,
    height: 148,
    borderRadius: 8,
  } as ViewStyle,

  scrollView: {
    flex: 1,
  } as ViewStyle,

  scrollContent: {
    paddingBottom: 69,
  } as ViewStyle,

  todayHeader: {
    marginTop: 123,
    marginLeft: 29,
    width: 130,
    height: 60,
  } as ViewStyle,

  todayText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 37,
  } as TextStyle,

  timePeriodSelector: {
    marginTop: 13,
    marginHorizontal: 16,
    marginBottom: 13,
  } as ViewStyle,

  periodWrapper: {
    flexDirection: "row",
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    padding: 6, // Even padding on all sides
    height: 44, // 32px background + 12px padding = 44px total height
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    width: 408,
    position: "relative",
  } as ViewStyle,

  slidingBackground: {
    position: "absolute",
    top: 6, // Start after top padding
    left: 6, // Start after left padding
    width: 196, // Move by sliding background width
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,

  periodButton: {
    flex: 1,
    height: 32, // Match sliding background height
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  } as ViewStyle,

  periodButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#63877D",
    lineHeight: 32, // Match button/sliding background height
  } as TextStyle,

  activePeriodButtonText: {
    color: "#121714",
  } as TextStyle,

  moodSummaryCard: {
    marginHorizontal: 16,
    marginBottom: 13,
    width: 408,
    height: 346,
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,

  moodSummaryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginHorizontal: 24,
    marginBottom: 8,
  } as ViewStyle,

  moodSummaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7B7B7B",
    lineHeight: 24,
  } as TextStyle,

  thisWeekText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A2A2A2",
    lineHeight: 24,
  } as TextStyle,

  moodScoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
    marginBottom: 8,
  } as ViewStyle,

  moodScore: {
    fontSize: 36,
    fontWeight: "800",
    color: "#000000",
    lineHeight: 44,
    marginRight: 12, // space between score and percentage
  } as TextStyle,

  moodChangeRow: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  moodChange: {
    fontSize: 14,
    fontWeight: "600",
    color: "#63877D",
    lineHeight: 24,
  } as TextStyle,

  moodGraphContainer: {
    position: "absolute",
    top: 119,
    left: 25,
    width: 358,
    height: 180,
  } as ViewStyle,

  // graphGradient: {
  //   width: 358,
  //   height: 148,
  //   borderRadius: 8,
  // } as ViewStyle,
  //
  graphOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 358,
    height: 148,
  } as ViewStyle,

  curveContainer: {
    width: 358,
    height: 148,
    position: "relative",
  } as ViewStyle,

  areaFillContainer: {
    position: "absolute",
    width: 358,
    height: 148,
    top: 0,
    left: 0,
  } as ViewStyle,

  triangleContainer: {
    position: "absolute",
  } as ViewStyle,

  bottomFill: {
    // position: "absolute",
    // backgroundColor: "#89B697",
    // opacity: 0.1,
  } as ViewStyle,

  topFill: {
    position: "absolute",
    backgroundColor: "#89B697",
    opacity: 0.1,
  } as ViewStyle,

  gradientOverlay: {
    position: "absolute",
    width: 358,
    height: 148,
    top: 0,
    left: 0,
  } as ViewStyle,

  curveLine: {
    position: "absolute",
    height: 2,
    backgroundColor: "#89B697",
    transformOrigin: "0 0",
  } as ViewStyle,

  daysContainer: {
    position: "absolute",
    top: 164,
    left: 0,
    width: 358,
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,

  dayText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#63877D",
    lineHeight: 20,
  } as TextStyle,

  backArrow: {
    position: "absolute",
    top: 310,
    left: 200,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  calmCard: {
    marginHorizontal: 16,
    marginBottom: 32,
    width: 408,
    height: 128,
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,

  calmImagePlaceholder: {
    position: "absolute",
    top: 26,
    left: 300,
    width: 80,
    height: 80,
    backgroundColor: "#D1E0D6",
    borderRadius: 10,
  } as ViewStyle,

  calmTitle: {
    position: "absolute",
    top: 28,
    left: 24,
    fontSize: 16,
    fontWeight: "800",
    color: "#000000",
    lineHeight: 20,
    width: 247,
  } as TextStyle,

  calmDescription: {
    position: "absolute",
    top: 54,
    left: 24,
    fontSize: 14,
    fontWeight: "300",
    color: "#000000",
    lineHeight: 20,
    width: 265,
  } as TextStyle,

  habitStreakHeader: {
    marginLeft: 40,
    marginBottom: 13,
    width: 247,
    height: 26,
  } as ViewStyle,

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000000",
    lineHeight: 20,
  } as TextStyle,

  morningJournalCard: {
    marginHorizontal: 16,
    marginBottom: 32,
    width: 408,
    height: 70,
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  } as ViewStyle,

  journalIconContainer: {
    width: 33,
    height: 33,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,

  journalIcon: {
    width: 29,
    height: 25,
  } as ViewStyle,

  journalArrow: {
    position: "relative",
    width: 10,
    height: 10,
  },

  journalContent: {
    flex: 1,
    paddingLeft: 10,
  } as ViewStyle,

  journalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000000",
    lineHeight: 20,
    width: 247,
  } as TextStyle,

  journalStreak: {
    fontSize: 14,
    fontWeight: "300",
    color: "#63877D",
    lineHeight: 20,
    width: 265,
    marginTop: -6,
  } as TextStyle,

  quickActionsHeader: {
    marginLeft: 40,
    marginBottom: 13,
    width: 247,
    height: 26,
  } as ViewStyle,

  cardsFlexContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  meditateCard: {
    marginHorizontal: 0,
    marginBottom: 13,
    width: 408,
    height: 112,
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 10,
  } as ViewStyle,

  moodCheckCard: {
    marginHorizontal: 0,
    marginBottom: 13,
    width: 408,
    height: 112,
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 10,
  } as ViewStyle,

  habitsCard: {
    marginHorizontal: 0,
    marginBottom: 13,
    width: 408,
    height: 153,
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 18,
  } as ViewStyle,

  goalsCard: {
    marginHorizontal: 0,
    marginBottom: 13,
    width: 408,
    height: 177,
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 18,
  } as ViewStyle,

  actionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000000",
    lineHeight: 20,
    marginBottom: 8,
  } as TextStyle,

  actionDescription: {
    fontSize: 14,
    fontWeight: "300",
    color: "#000000",
    lineHeight: 20,
    marginBottom: 12,
  } as TextStyle,

  actionButton: {
    backgroundColor: "#89B697",
    borderRadius: 100,
    width: 170,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  } as ViewStyle,

  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    lineHeight: 24,
    textAlign: "center",
  } as TextStyle,

  goalStreak: {
    fontSize: 14,
    fontWeight: "300",
    color: "#63877D",
    lineHeight: 20,
    marginBottom: 8,
  } as TextStyle,

  exportButton: {
    marginHorizontal: 36,
    marginBottom: 13,
    width: 367,
    height: 62,
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,

  exportButtonWide: {
    marginHorizontal: 0,
    marginBottom: 13,
    width: 408,
    height: 62,
    backgroundColor: "#ECECEC",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B5B5B",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 24,
    paddingVertical: 18,
  } as ViewStyle,

  exportButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    lineHeight: 24,
    textAlign: "center",
  } as TextStyle,

  bottomPadding: {
    height: 60,
  } as ViewStyle,

  taskBarContainer: {
    position: "absolute",
    bottom: 47,
    left: 50,
    right: 50,
    alignItems: "center",
  } as ViewStyle,
});
