import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ViewStyle,
} from "react-native";
import Svg, { G, Rect } from "react-native-svg";

interface SegmentedProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 to 1
  totalSegments?: number;
  icon?: any; // require(...) image
  iconSize?: number;
  symbol?: string; // emoji or text
  centerContent?: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
}

export default function SegmentedProgressRing({
  size = 44,
  strokeWidth = 8,
  progress,
  totalSegments = 12,
  icon,
  iconSize = 16,
  symbol,
  centerContent,
  activeColor = "#89B697",
  inactiveColor = "#D6E4D8",
  style,
}: SegmentedProgressRingProps) {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const filledSegments = Math.round(progress * totalSegments);

  const segmentAngle = 360 / totalSegments;
  const segmentLength = segmentAngle * (Math.PI / 180) * radius; // arc length
  const dashWidth = segmentLength * 0.8; // make dash shorter than arc
  const dashHeight = strokeWidth;
  // const rx = dashHeight / 2;
  const rx = 3;

  let renderedIcon = null;

  if (centerContent && !icon) {
    renderedIcon = <View>{centerContent}</View>;
  } else if (icon && !centerContent) {
    renderedIcon = icon;
  } else if (typeof icon === "function") {
    const IconComponent = icon as React.FC<{ width: number; height: number }>;
    renderedIcon = <IconComponent width={iconSize} height={iconSize} />;
  } else if (typeof icon === "number") {
    renderedIcon = (
      <Image
        source={icon}
        style={{ width: iconSize, height: iconSize }}
        resizeMode="contain"
      />
    );
  } else if (typeof icon === "string") {
    renderedIcon = (
      <Text style={[styles.symbolText, { fontSize: iconSize }]}>{icon}</Text>
    );
  }

  const s = { width: size, height: size } as ViewStyle;

  return (
    <View style={[s, style]}>
      <Svg width={size} height={size}>
        <G origin={`${center}, ${center}`}>
          {Array.from({ length: totalSegments }).map((_, i) => {
            const angle = segmentAngle * i;
            const isActive = i < filledSegments;

            return (
              <G key={i} rotation={angle} origin={`${center}, ${center}`}>
                <Rect
                  x={center - dashWidth / 2}
                  y={center - radius - dashHeight / 2}
                  width={dashWidth}
                  height={dashHeight}
                  rx={rx}
                  fill={isActive ? activeColor : inactiveColor}
                />
              </G>
            );
          })}
        </G>
      </Svg>

      {/* Center content */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.center}>{renderedIcon}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  symbolText: {
    color: "#000",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "SF Pro" : undefined,
  },
});
