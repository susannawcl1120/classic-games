import { metrics } from "@/theme/metrics";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

function CountDown({
  handleShowResult,
  count,
  setCount,
}: {
  handleShowResult: () => void;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) {
  const scaleAnim = useState(new Animated.Value(1))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];
  const handleShowResultRef = useRef(handleShowResult);

  useEffect(() => {
    handleShowResultRef.current = handleShowResult;
  }, [handleShowResult]);

  useEffect(() => {
    if (count <= 0) {
      handleShowResultRef.current();
      return;
    }

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          handleShowResultRef.current();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [count, setCount]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (count <= 3 && count > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [count, scaleAnim, pulseAnim]);

  const getCountColor = () => {
    if (count <= 3) return "#FF4444";
    if (count <= 6) return "#FFA500";
    return "#00FF00";
  };

  const getBackgroundColor = () => {
    if (count <= 3) return "#FFE4E4";
    if (count <= 6) return "#FFF4E4";
    return "#E4FFE4";
  };

  const getCountText = () => {
    if (count === 0) return "時間到！";
    return count.toString();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.countdownBox,
          {
            transform: [
              { scale: scaleAnim },
              { scale: count <= 3 ? pulseAnim : 1 },
            ],
            backgroundColor: getBackgroundColor(),
            borderColor: getCountColor(),
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[styles.countText, { color: getCountColor() }]}
        >
          {getCountText()}
        </Text>
        <Text style={styles.labelText}>倒數計時</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  countdownBox: {
    width: metrics.wp(120),
    height: metrics.hp(120),
    borderRadius: 60,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  countText: {
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 4,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    opacity: 0.8,
  },
});

export default CountDown;
