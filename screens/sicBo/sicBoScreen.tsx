import PokerChip from "@/components/pokerChip/PokerChip";
import { metrics } from "@/theme/metrics";
import { useCallback, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import CountDown from "./components/CountDown";

interface BettingPosition {
  x: number;
  y: number;
  value: number;
}

function SicBoScreen() {
  const [count, setCount] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [bigBets, setBigBets] = useState<BettingPosition[]>([]);
  const [smallBets, setSmallBets] = useState<BettingPosition[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bigTotal, setBigTotal] = useState(0);
  const [smallTotal, setSmallTotal] = useState(0);
  const [diceTotal, setDiceTotal] = useState(0);

  const bigBoxRef = useRef<View>(null);
  const smallBoxRef = useRef<View>(null);

  const handleChipSelect = useCallback(
    (value: number) => {
      if (count <= 0) return;
      setSelectedChip(value);
    },
    [count]
  );

  const getRandomPosition = useCallback(
    (
      boxRef: React.RefObject<View | null>,
      value: number
    ): Promise<BettingPosition> => {
      return new Promise((resolve) => {
        if (boxRef.current) {
          boxRef.current.measure((_x, _y, width, height, _pageX, _pageY) => {
            const borderWidth = 3;
            const chipSize = 40;
            const padding = 10;

            const minX = borderWidth + padding;
            const maxX = width - borderWidth - chipSize - padding;
            const minY = borderWidth + padding;
            const maxY = height - borderWidth - chipSize - padding;

            const randomX = Math.random() * (maxX - minX) + minX;
            const randomY = Math.random() * (maxY - minY) + minY;

            resolve({ x: randomX, y: randomY, value });
          });
        } else {
          resolve({ x: 50, y: 50, value });
        }

        setBalance(balance - value);
      });
    },
    [balance]
  );

  const handleBet = useCallback(
    async (betType: "big" | "small") => {
      if (!selectedChip || isAnimating) return;

      setIsAnimating(true);

      try {
        const targetBox = betType === "big" ? bigBoxRef : smallBoxRef;
        const position = await getRandomPosition(targetBox, selectedChip);

        if (betType === "big") {
          setBigBets((prev) => [...prev, position]);
          setBigTotal((prev) => prev + selectedChip);
        } else {
          setSmallBets((prev) => [...prev, position]);
          setSmallTotal((prev) => prev + selectedChip);
        }

        setSelectedChip(null);
      } finally {
        setTimeout(() => setIsAnimating(false), 1000);
      }
    },
    [selectedChip, isAnimating, getRandomPosition]
  );

  const handleReset = () => {
    if (diceTotal >= 11 && diceTotal <= 17) {
      setBalance(balance + bigTotal * 2);
    } else if (diceTotal >= 4 && diceTotal <= 10) {
      setBalance(balance + smallTotal * 2);
    }
    setBigBets([]);
    setSmallBets([]);
    setBigTotal(0);
    setSmallTotal(0);
    setDiceTotal(0);
    setCount(10);
  };

  const handleRollDice = () => {
    const dice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    setDiceTotal(dice.reduce((acc, curr) => acc + curr, 0));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎲 Sic Bo 🎲</Text>
        <Text style={styles.ruleText}>
          規則：倒數10秒內可以選擇下注大或小，贏家會得到下注金額的雙倍
        </Text>
      </View>
      <CountDown
        handleShowResult={handleRollDice}
        count={count}
        setCount={setCount}
      />

      <View style={styles.chipsContainer}>
        <Pressable onPress={() => handleChipSelect(5)}>
          <PokerChip value={5} size={selectedChip === 5 ? 70 : 60} />
        </Pressable>
        <Pressable onPress={() => handleChipSelect(10)}>
          <PokerChip value={10} size={selectedChip === 10 ? 70 : 60} />
        </Pressable>
        <Pressable onPress={() => handleChipSelect(25)}>
          <PokerChip value={25} size={selectedChip === 25 ? 70 : 60} />
        </Pressable>
        <Pressable onPress={() => handleChipSelect(100)}>
          <PokerChip value={100} size={selectedChip === 100 ? 70 : 60} />
        </Pressable>
      </View>

      <View style={styles.bettingArea}>
        <Pressable
          ref={bigBoxRef}
          style={[
            styles.bettingBox,
            selectedChip ? styles.selectedBettingBox : null,
            diceTotal >= 11 && diceTotal <= 17 && styles.bettingBoxActive,
          ]}
          onPress={() => handleBet("big")}
          disabled={!selectedChip || isAnimating}
        >
          <Text style={styles.bettingText}>大</Text>
          <Text style={styles.bettingSubText}>11-17</Text>
          {bigBets.map((bet, index) => (
            <Animated.View
              key={index}
              style={[
                styles.betChip,
                {
                  position: "absolute",
                  left: bet.x,
                  top: bet.y,
                },
              ]}
            >
              <PokerChip value={bet.value} size={40} />
            </Animated.View>
          ))}
        </Pressable>
        <Pressable
          ref={smallBoxRef}
          style={[
            styles.bettingBox,
            selectedChip ? styles.selectedBettingBox : null,
            diceTotal >= 4 && diceTotal <= 10 && styles.bettingBoxActive,
          ]}
          onPress={() => handleBet("small")}
          disabled={!selectedChip || isAnimating}
        >
          <Text style={styles.bettingText}>小</Text>
          <Text style={styles.bettingSubText}>4-10</Text>
          {smallBets.map((bet, index) => (
            <Animated.View
              key={index}
              style={[
                styles.betChip,
                {
                  position: "absolute",
                  left: bet.x,
                  top: bet.y,
                },
              ]}
            >
              <PokerChip value={bet.value} size={40} />
            </Animated.View>
          ))}
        </Pressable>
      </View>
      <View style={styles.totalCountContainer}>
        <Text style={styles.totalCountText}>累計{bigTotal}</Text>
        <Text style={styles.totalCountText}>累計{smallTotal}</Text>
      </View>
      <Text style={styles.balanceText}>錢包剩餘：{balance}</Text>
      <Pressable style={styles.resetButton} onPress={handleReset}>
        <Text>下一局</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  header: {
    alignItems: "center",
    gap: metrics.spacing.sm,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "#FFA500",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  chipsContainer: {
    height: metrics.hp(100),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  ruleText: {
    fontSize: 16,
    color: "#FFD700",
    marginBottom: 20,
    textAlign: "center",
  },
  bettingArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 20,
  },
  bettingBoxActive: {
    backgroundColor: "#FFD700",
    shadowColor: "#FFA500",
    borderColor: "#FFA500",
  },
  bettingBox: {
    flex: 1,
    backgroundColor: "#4ECDC4",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#26A69A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: "#26A69A",
  },
  bettingText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  bettingSubText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    opacity: 0.9,
  },
  selectedBettingBox: {
    shadowOpacity: 0.8,
  },
  betChip: {
    zIndex: 10,
  },
  totalCountText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  totalCountContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: metrics.spacing.sm,
    width: "100%",
    paddingHorizontal: 20,
  },
  balanceText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
  },
});

export default SicBoScreen;
