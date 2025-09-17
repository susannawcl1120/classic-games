import { metrics } from "@/theme/metrics";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type Props = {
  isWin: boolean;
  showAnimation: boolean;
  diceTotal: number;
  winnings: number;
  onAnimationComplete: () => void;
};

function ResultAnimation({
  isWin,
  showAnimation,
  diceTotal,
  winnings,
  onAnimationComplete,
}: Props) {
  const winAnimationRef = useRef(new Animated.Value(0)).current;
  const loseAnimationRef = useRef(new Animated.Value(0)).current;
  const confettiRefs = useRef<Animated.Value[]>([]).current;

  useEffect(() => {
    if (!showAnimation) return;

    if (isWin) {
      for (let i = 0; i < 20; i++) {
        confettiRefs[i] = new Animated.Value(0);
      }

      Animated.timing(winAnimationRef, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const confettiAnimations = confettiRefs.map((ref, index) => {
        return Animated.sequence([
          Animated.delay(index * 50),
          Animated.timing(ref, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.parallel(confettiAnimations).start();

      setTimeout(() => {
        winAnimationRef.setValue(0);
        confettiRefs.forEach((ref) => ref.setValue(0));
        onAnimationComplete();
      }, 5000);
    } else {
      Animated.timing(loseAnimationRef, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        loseAnimationRef.setValue(0);
        onAnimationComplete();
      }, 5000);
    }
  }, [
    showAnimation,
    isWin,
    winAnimationRef,
    loseAnimationRef,
    confettiRefs,
    onAnimationComplete,
  ]);

  if (!showAnimation) return null;

  return (
    <>
      {isWin && (
        <Animated.View
          style={[
            styles.winOverlay,
            {
              opacity: winAnimationRef,
              transform: [
                {
                  scale: winAnimationRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.winText}>🎉 恭喜中獎！🎉</Text>
          <Text style={styles.winSubText}>總點數：{diceTotal}</Text>
          <Text style={styles.winSubText}>
            結果：{diceTotal >= 11 && diceTotal <= 17 ? "大" : "小"}
          </Text>
          <Text style={styles.winningsText}>獎金：+{winnings}</Text>

          {confettiRefs.map((ref, index) => (
            <Animated.View
              key={index}
              style={[
                styles.confetti,
                {
                  left: Math.random() * metrics.screenWidth,
                  backgroundColor: ["#FF6B6B", "#4ECDC4", "#FFD700", "#FFA500"][
                    index % 4
                  ],
                  transform: [
                    {
                      translateY: ref.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, metrics.screenHeight + 100],
                      }),
                    },
                    {
                      rotate: ref.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "720deg"],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </Animated.View>
      )}

      {!isWin && (
        <Animated.View
          style={[
            styles.loseOverlay,
            {
              opacity: loseAnimationRef,
              transform: [
                {
                  scale: loseAnimationRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.loseText}>😔 再接再厲</Text>
          <Text style={styles.loseSubText}>總點數：{diceTotal}</Text>
          <Text style={styles.loseSubText}>
            結果：{diceTotal >= 11 && diceTotal <= 17 ? "大" : "小"}
          </Text>
          <Text style={styles.loseHintText}>下次一定會贏的！</Text>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  winOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  winText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  winSubText: {
    fontSize: 24,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
  },
  winningsText: {
    fontSize: 28,
    color: "#00FF00",
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 10,
  },
  confetti: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  loseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loseText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FF6B6B",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  loseSubText: {
    fontSize: 24,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },
  loseHintText: {
    fontSize: 18,
    color: "#FFD700",
    textAlign: "center",
    fontWeight: "500",
    opacity: 0.9,
  },
});

export default ResultAnimation;
