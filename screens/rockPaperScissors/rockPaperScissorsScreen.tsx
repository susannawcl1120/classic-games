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

  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>("1");

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [computerAction, setComputerAction] = useState<Action | null>(null);

  const [totalCount, setTotalCount] = useState(1);

  const [computerWinCount, setComputerWinCount] = useState(0);

  const [playerWinCount, setPlayerWinCount] = useState(0);

  const resetGame = useCallback(
    (newGameMode?: GameMode) => {
      setResult(null);
      setComputerAction(null);
      setSelectedAction("");
      setComputerWinCount(0);
      setPlayerWinCount(0);
      setTotalCount(Number(newGameMode ? newGameMode : selectedGameMode));
    },
    [selectedGameMode]
  );

  const handleActionButtonPress = useCallback(
    (action: Action) => {
      setSelectedAction(action);
      if (result) {
        resetGame();
      }
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

    if (selectedGameMode === "1") return;

    const nextTotalCount = totalCount - 1;
    setTotalCount(nextTotalCount);

    if (gameResult === "win") {
      setPlayerWinCount((prev) => prev + 1);
    } else if (gameResult === "lose") {
      setComputerWinCount((prev) => prev + 1);
    }
  }, [selectedAction, selectedGameMode, totalCount]);

  const resetCurrentRound = useCallback(() => {
    setResult(null);
    setComputerAction(null);
    setSelectedAction("");
  }, []);

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
      const newMode = value as GameMode;
      if (newMode === selectedGameMode) {
        setIsBottomSheetVisible(false);
        return;
      }

      setSelectedGameMode(newMode);
      setTotalCount(Number(value));
      resetGame(newMode);
      setIsBottomSheetVisible(false);
    },
    [selectedGameMode, resetGame]
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
        {selectedGameMode !== "1" && <Text>剩餘{totalCount}局</Text>}
      </View>

      <View style={styles.gameArea}>
        <RandomImage
          result={result}
          computerAction={computerAction}
          setComputerAction={setComputerAction}
        />

        <View style={styles.resultContainer}>
          {selectedGameMode !== "1" && (
            <Text>對方贏了{computerWinCount}次</Text>
          )}
          <View style={styles.resultTitle}>
            <Text style={styles.resultTitleText}>
              勝負結果{resultText && "："}
            </Text>
            {resultText && <Text style={styles.resultText}>{resultText}</Text>}
          </View>

          {selectedGameMode !== "1" && <Text>你贏了{playerWinCount}次</Text>}
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
              disabled={result !== null}
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
        onPress={() => {
          if (result || totalCount === 0) {
            if (selectedGameMode === "1") {
              resetGame();
            } else if (totalCount === 0) {
              resetGame();
            } else {
              resetCurrentRound();
            }
          } else {
            handleReadyButtonPress();
          }
        }}
        disabled={!selectedAction}
      >
        <Text style={styles.readyButtonText}>
          {result
            ? totalCount === 0
              ? "重新開局"
              : selectedGameMode === "1"
              ? "重新開始"
              : "下一局"
            : "準備好了"}
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
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  resultTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
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
