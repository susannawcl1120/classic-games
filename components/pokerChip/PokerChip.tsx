import { StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";

interface PokerChipProps {
  value?: number;
  color?: string;
  size?: number;
}

const getChipColor = (value: number): string => {
  if (value <= 5) return "#FFFFFF";
  if (value <= 10) return "#FF0000";
  if (value <= 25) return "#00FF00";
  if (value <= 100) return "#0000FF";
  if (value <= 500) return "#FFD700";
  if (value <= 1000) return "#800080";
  return "#FFA500";
};

const getGradientColors = (baseColor: string) => {
  const colorMap: {
    [key: string]: { light: string; medium: string; dark: string };
  } = {
    "#FFFFFF": { light: "#FFFFFF", medium: "#F0F0F0", dark: "#E0E0E0" },
    "#FF0000": { light: "#FFB3B3", medium: "#FF6666", dark: "#CC0000" },
    "#00FF00": { light: "#B3FFB3", medium: "#66FF66", dark: "#00CC00" },
    "#0000FF": { light: "#B3B3FF", medium: "#6666FF", dark: "#0000CC" },
    "#FFD700": { light: "#FFF8DC", medium: "#FFD700", dark: "#DAA520" },
    "#800080": { light: "#E6B3E6", medium: "#B366B3", dark: "#660066" },
    "#FFA500": { light: "#FFE4B3", medium: "#FFA500", dark: "#CC8400" },
  };

  return colorMap[baseColor] || colorMap["#FFD700"];
};

function PokerChip({ value = 100, color, size = 60 }: PokerChipProps) {
  const chipColor = color || getChipColor(value);
  const gradientColors = getGradientColors(chipColor);
  const radius = size / 2;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient
            id="outerGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop
              offset="0%"
              stopColor={gradientColors.light}
              stopOpacity="1"
            />
            <Stop
              offset="50%"
              stopColor={gradientColors.medium}
              stopOpacity="1"
            />
            <Stop
              offset="100%"
              stopColor={gradientColors.dark}
              stopOpacity="1"
            />
          </LinearGradient>

          <LinearGradient
            id="innerGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop
              offset="0%"
              stopColor={gradientColors.light}
              stopOpacity="0.8"
            />
            <Stop
              offset="50%"
              stopColor={gradientColors.medium}
              stopOpacity="0.9"
            />
            <Stop
              offset="100%"
              stopColor={gradientColors.dark}
              stopOpacity="1"
            />
          </LinearGradient>

          <LinearGradient
            id="shadowGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>

        <Circle
          cx={centerX + 2}
          cy={centerY + 2}
          r={radius - 2}
          fill="url(#shadowGradient)"
        />

        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - 2}
          fill="url(#outerGradient)"
          stroke="#8B4513"
          strokeWidth="2"
        />

        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - 8}
          fill="url(#innerGradient)"
          stroke="#8B4513"
          strokeWidth="1"
        />

        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - 16}
          fill={chipColor}
          stroke="#8B4513"
          strokeWidth="1"
        />

        <SvgText
          x={centerX}
          y={centerY + 4}
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          fill="#000"
        >
          {value}
        </SvgText>

        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - 4}
          fill="none"
          stroke={gradientColors.light}
          strokeWidth="1"
          opacity="0.6"
        />

        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - 12}
          fill="none"
          stroke={gradientColors.light}
          strokeWidth="1"
          opacity="0.4"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PokerChip;
