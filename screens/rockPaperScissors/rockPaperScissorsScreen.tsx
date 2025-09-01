import DropdownText from "@/components/dropdownText/dropdownText";
import {
  ACTION_IMAGES,
  ACTIONS,
  GAME_MODE_MAP,
  GAME_MODES,
} from "@/constants/rockPaperScissors";
import { Action, GameMode, GameResult } from "@/types/rockPaperScissors";
import { useCallback, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import RandomImage from "./components/randomImage";

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

  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>("one");

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [computerAction, setComputerAction] = useState<Action | null>(null);

  const resetGame = useCallback(() => {
    setResult(null);
    setComputerAction(null);
    setSelectedAction("");
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

  const handleUpdateGameMode = useCallback(
    (value: string) => {
      setSelectedGameMode((prev) => {
        const newMode = value as GameMode;
        if (newMode === prev) return prev;

        resetGame();
        return newMode;
      });

      setIsBottomSheetVisible(false);
    },
    [resetGame, setIsBottomSheetVisible]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>剪刀石頭布</Text>
        <View style={styles.headerButton}>
          <DropdownText
            text={GAME_MODE_MAP[selectedGameMode] || "選擇決鬥方式"}
            onPress={() => setIsBottomSheetVisible(true)}
            visible={isBottomSheetVisible}
            setVisible={setIsBottomSheetVisible}
            options={GAME_MODES}
            checkedValue={selectedGameMode}
            handleUpdateValue={handleUpdateGameMode}
            title="選擇決鬥方式"
          />
        </View>
      </View>

      <View style={styles.gameArea}>
        <RandomImage
          result={result}
          computerAction={computerAction}
          setComputerAction={setComputerAction}
        />

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
        style={[
          styles.readyButton,
          !selectedAction && styles.disabledButton,
          result && styles.resetButton,
        ]}
        onPress={result ? resetGame : handleReadyButtonPress}
        disabled={!selectedAction}
      >
        <Text style={styles.readyButtonText}>
          {result ? "重新開始" : "準備好了"}
        </Text>
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
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 100,
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
    borderRadius: 100,
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
  resetButton: {
    backgroundColor: "#FF3B30",
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
