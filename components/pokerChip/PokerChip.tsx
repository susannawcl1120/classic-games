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

function PokerChip({
  value = 100,
  color = "#FFD700",
  size = 60,
}: PokerChipProps) {
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
            <Stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <Stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FF8C00" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient
            id="innerGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop offset="0%" stopColor="#FFF8DC" stopOpacity="1" />
            <Stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
            <Stop offset="100%" stopColor="#DAA520" stopOpacity="1" />
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
          fill={color}
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
          stroke="#FFD700"
          strokeWidth="1"
          opacity="0.6"
        />

        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - 12}
          fill="none"
          stroke="#FFD700"
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
