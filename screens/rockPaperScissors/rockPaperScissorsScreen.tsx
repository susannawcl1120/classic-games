import { ACTION_IMAGES, ACTIONS } from "@/constants/rockPaperScissors";
import { Action, GameResult } from "@/types/rockPaperScissors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const getGameResult = (
  playerAction: Action,
  computerAction: Action
): GameResult => {
  if (playerAction === computerAction) return "draw";

  const winConditions = {
    scissors: "paper",
    rock: "scissors",
    paper: "rock",
  };

  return winConditions[playerAction] === computerAction ? "win" : "lose";
};

function RockPaperScissorsScreen() {
  const [selectedAction, setSelectedAction] = useState<Action | "">("");
  const [result, setResult] = useState<GameResult>(null);
  const [computerAction, setComputerAction] = useState<Action | null>(null);

  const resetGame = useCallback(() => {
    setResult(null);
    setComputerAction(null);
  }, []);

  const handleActionButtonPress = useCallback(
    (action: Action) => {
      setSelectedAction(action);
      result && resetGame();
    },
    [resetGame, result]
  );

  const handleReadyButtonPress = useCallback(() => {
    if (!selectedAction) return;

    const randomComputerAction =
      ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    setComputerAction(randomComputerAction);

    const gameResult = getGameResult(selectedAction, randomComputerAction);
    setResult(gameResult);
  }, [selectedAction]);

  useEffect(() => {
    if (result !== null) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setComputerAction(ACTIONS[currentIndex]);
      currentIndex = (currentIndex + 1) % ACTIONS.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [result]);

  const currentImage = useMemo(() => {
    if (!computerAction) return null;
    return ACTION_IMAGES[computerAction];
  }, [computerAction]);

  const resultText = useMemo(() => {
    switch (result) {
      case "win":
        return "你贏了";
      case "lose":
        return "你輸了";
      case "draw":
        return "平手";
      default:
        return null;
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>剪刀石頭布</Text>
        <Pressable style={styles.headerButton}>
          <Text style={styles.headerButtonText}>一局定勝負</Text>
        </Pressable>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.computerActionContainer}>
          {currentImage && (
            <Image source={currentImage} style={styles.computerActionImage} />
          )}
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>勝負結果</Text>
          {resultText && <Text style={styles.resultText}>{resultText}</Text>}
        </View>

        <View style={styles.actionsContainer}>
          {ACTIONS.map((action) => (
            <Pressable
              key={action}
              style={[
                styles.actionButton,
                selectedAction === action && styles.selectedActionButton,
              ]}
              onPress={() => handleActionButtonPress(action)}
            >
              <Image
                source={ACTION_IMAGES[action]}
                style={styles.actionButtonImage}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        style={[styles.readyButton, !selectedAction && styles.disabledButton]}
        onPress={handleReadyButtonPress}
        disabled={!selectedAction}
      >
        <Text style={styles.readyButtonText}>準備好了</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  headerButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  headerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  gameArea: {
    width: "100%",
    gap: 24,
  },
  computerActionContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 80,
  },
  computerActionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  resultContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,
  },
  actionButton: {
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedActionButton: {
    borderWidth: 3,
    borderColor: "#34C759",
    transform: [{ scale: 1.1 }],
  },
  actionButtonImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  readyButton: {
    backgroundColor: "#34C759",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  readyButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default RockPaperScissorsScreen;
