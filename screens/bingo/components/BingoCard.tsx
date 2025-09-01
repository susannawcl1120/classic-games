import { metrics } from "@/theme/metrics";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface BingoCardProps {
  isSpinning?: boolean;
  symbol?: string;
  onSpinComplete?: () => void;
}

function BingoCard({
  isSpinning = false,
  symbol = "🍎",
  onSpinComplete,
}: BingoCardProps) {
  const spinAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSpinning) {
      Animated.loop(
        Animated.timing(spinAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnimation.stopAnimation();
      spinAnimation.setValue(0);
    }
  }, [isSpinning, spinAnimation]);

  const spinInterpolate = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.cardGradient}>
        <View style={styles.cardContent}>
          <Animated.View
            style={[
              styles.symbolContainer,
              { transform: [{ rotate: spinInterpolate }] },
            ]}
          >
            <View style={styles.symbolBackground}>
              <Text style={styles.symbol}>{symbol}</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.outerBorder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: metrics.wp(100),
    height: metrics.hp(80),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardGradient: {
    width: metrics.wp(100),
    height: metrics.hp(80),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  symbolContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  symbolBackground: {
    width: metrics.wp(60),
    height: metrics.hp(50),
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: metrics.wp(7.5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#8B4513",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  symbol: {
    fontSize: metrics.wp(40),
    fontWeight: "bold",
  },
  outerBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#8B4513",
  },
});

export default BingoCard;
