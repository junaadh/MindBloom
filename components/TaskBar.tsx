// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   TextStyle,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { BlurView } from "expo-blur";

// export type TabType = "home" | "explore" | "journal" | "profile";

// interface TaskBarProps {
//   activeTab: TabType;
//   onTabPress: (tab: TabType) => void;
// }

// const tabs = [
//   {
//     id: "home" as TabType,
//     label: "Home",
//     icon: "home" as keyof typeof Ionicons.glyphMap,
//   },
//   {
//     id: "explore" as TabType,
//     label: "Explore",
//     icon: "search" as keyof typeof Ionicons.glyphMap,
//   },
//   {
//     id: "journal" as TabType,
//     label: "Journal",
//     icon: "book" as keyof typeof Ionicons.glyphMap,
//   },
//   {
//     id: "profile" as TabType,
//     label: "Profile",
//     icon: "person" as keyof typeof Ionicons.glyphMap,
//   },
// ];

// export default function TaskBar({ activeTab, onTabPress }: TaskBarProps) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.taskbar}>
//         <BlurView intensity={30} tint="dark" style={styles.blurOverlay} />

//         {tabs.map((tab) => {
//           const isActive = activeTab === tab.id;

//           return (
//             <TouchableOpacity
//               key={tab.id}
//               style={styles.tabContainer}
//               onPress={() => onTabPress(tab.id)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.tabContent}>
//                 <Ionicons
//                   name={tab.icon}
//                   size={18}
//                   color={isActive ? "#000000" : "#FFFFFF"}
//                   style={styles.tabIcon}
//                 />
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={[
//                     styles.tabLabel,
//                     { color: isActive ? "#000000" : "#FFFFFF" },
//                   ]}
//                 >
//                   {tab.label}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// export const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingBottom: 20,
//   } as ViewStyle,

//   taskbar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 348,
//     height: 60,
//     borderRadius: 100,
//     overflow: "hidden",

//     paddingVertical: 13,
//     paddingHorizontal: 24,
//     backgroundColor: "rgba(18, 20, 23, 0.4)",

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.25,
//     shadowRadius: 13,
//     elevation: 8,
//   } as ViewStyle,

//   blurOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 100,
//   } as ViewStyle,

//   tabContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   } as ViewStyle,

//   tabContent: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 60,
//     height: 60,
//   } as ViewStyle,

//   tabIcon: {
//     marginBottom: 2,
//   } as ViewStyle,

//   tabLabel: {
//     fontSize: 12,
//     fontWeight: "400",
//     lineHeight: 16,
//     textAlign: "center",
//   } as TextStyle,
// });

// // export const styles = StyleSheet.create({
// //   container: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     padding: 20,
// //   } as ViewStyle,

// //   taskbar: {
// //     flexDirection: "row",
// //     justifyContent: "space-around", // Even spacing
// //     alignItems: "center",
// //     // paddingVertical: 13,
// //     // paddingHorizontal: 41,
// //     // gap: 52,
// //     width: 348,
// //     height: 60,
// //     // backgroundColor: "rgba(18, 20, 23, 0.4)",
// //     backgroundColor: "rgba(18, 20, 23, 0.2)",
// //     borderRadius: 100,
// //     overflow: "hidden",

// //     // iOS shadow
// //     shadowColor: "#000000",
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 13,

// //     // Android elevation
// //     elevation: 8,
// //   } as ViewStyle,

// //   blurWrapper: {
// //     ...StyleSheet.absoluteFillObject,
// //     borderRadius: 100,
// //   } as ViewStyle,

// //   tabContainer: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     width: 36,
// //     height: 34,
// //   } as ViewStyle,

// //   tabIcon: {
// //     width: 18,
// //     height: 18,
// //     marginBottom: 2,
// //     resizeMode: "contain",
// //   } as ViewStyle,

// //   tabLabel: {
// //     fontSize: 10,
// //     fontWeight: "400",
// //     lineHeight: 24,
// //     color: "#FFFFFF",
// //     textAlign: "center",
// //   } as TextStyle,
// // });

import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";

export type TabType = "home" | "explore" | "journal" | "profile";

interface TaskBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: "home" },
  { id: "explore", label: "Explore", icon: "search" },
  { id: "journal", label: "Journal", icon: "book" },
  { id: "profile", label: "Profile", icon: "person" },
] as const;

export default function TaskBar({ activeTab, onTabPress }: TaskBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.taskbar}>
        <BlurView
          intensity={40}
          tint="dark"
          fallbackColor="rgba(18, 20, 23, 0.4)"
          style={styles.blurOverlay}
        />
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabContainer}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={isActive ? "#000" : "#fff"}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? "#000" : "#fff" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    width: "100%",
  } as ViewStyle,

  taskbar: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 348,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",

    // shadow
    backgroundColor: "rgba(18, 20, 23, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 13,
    elevation: 8,
  } as ViewStyle,

  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
  } as ViewStyle,

  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  } as ViewStyle,

  icon: {
    marginBottom: 2,
  } as ViewStyle,

  label: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "center",
  } as TextStyle,
});
