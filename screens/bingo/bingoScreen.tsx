import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BingoCard from "./components/BingoCard";

const SLOT_SYMBOLS = ["🍎", "🍊", "🍇", "🍒", "🍋", "💎", "7️⃣", "🎰"];

function BingoScreen() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [symbols, setSymbols] = useState(["🍎", "🍊", "🍇"]);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      const newSymbols = [];
      for (let i = 0; i < 3; i++) {
        newSymbols.push(
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]
        );
      }
      setSymbols(newSymbols);
      setIsSpinning(false);

      if (newSymbols[0] === newSymbols[1] && newSymbols[1] === newSymbols[2]) {
        setResult("🎉 恭喜中獎！");
      } else if (
        newSymbols[0] === newSymbols[1] ||
        newSymbols[1] === newSymbols[2] ||
        newSymbols[0] === newSymbols[2]
      ) {
        setResult("🎊 小獎！");
      } else {
        setResult("😔 再接再厲");
      }
    }, 2000);
  };

  const handleGuaranteedWin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      const randomSymbol =
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
      const newSymbols = [randomSymbol, randomSymbol, randomSymbol];
      setSymbols(newSymbols);
      setIsSpinning(false);

      setResult("🎉 恭喜中獎！");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎰 Bingo 🎰</Text>

      <View style={styles.cardsContainer}>
        {symbols.map((symbol, index) => (
          <BingoCard key={index} symbol={symbol} isSpinning={isSpinning} />
        ))}
      </View>

      {result && (
        <View
          style={[
            styles.resultContainer,
            result.includes("中獎") && styles.winResultContainer,
            result.includes("小獎") && styles.smallWinResultContainer,
            result.includes("再接再厲") && styles.loseResultContainer,
          ]}
        >
          <Text
            style={[
              styles.resultText,
              result.includes("中獎") && styles.winResultText,
              result.includes("小獎") && styles.smallWinResultText,
              result.includes("再接再厲") && styles.loseResultText,
            ]}
          >
            {result}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.spinButton, isSpinning && styles.spinningButton]}
          onPress={handleSpin}
          disabled={isSpinning}
        >
          <Text style={styles.spinButtonText}>
            {isSpinning ? "旋轉中..." : "開始遊戲"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.guaranteedButton, isSpinning && styles.spinningButton]}
          onPress={handleGuaranteedWin}
          disabled={isSpinning}
        >
          <Text style={styles.guaranteedButtonText}>
            {isSpinning ? "旋轉中..." : "🎯 必中"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 40,
    textShadowColor: "#FFA500",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  resultContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  winResultContainer: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderColor: "#4CAF50",
  },
  smallWinResultContainer: {
    backgroundColor: "rgba(255, 193, 7, 0.2)",
    borderColor: "#FFC107",
  },
  loseResultContainer: {
    backgroundColor: "rgba(244, 67, 54, 0.2)",
    borderColor: "#F44336",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  winResultText: {
    color: "#4CAF50",
  },
  smallWinResultText: {
    color: "#FFC107",
  },
  loseResultText: {
    color: "#F44336",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  spinButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  guaranteedButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#FF4757",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  spinningButton: {
    backgroundColor: "#999",
    shadowOpacity: 0.2,
  },
  spinButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  guaranteedButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default BingoScreen;
