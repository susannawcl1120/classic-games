import { images } from "@/constants/Images";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function RockPaperScissorsScreen() {
  const [selectedAction, setSelectedAction] = useState("");
  const [result, setResult] = useState<("win" | "lose" | "draw") | null>(null);
  const [randomAction, setRandomAction] = useState<
    ("scissors" | "rock" | "paper") | null
  >(null);

  const handleActionButtonPress = (action: "scissors" | "rock" | "paper") => {
    setSelectedAction(action);
    setResult(null);
    result && setRandomAction(null);
  };

  const handleReadyButtonPress = () => {
    if (selectedAction === "") return;

    const computerAction = ["scissors", "rock", "paper"][
      Math.floor(Math.random() * 3)
    ] as "scissors" | "rock" | "paper";

    setRandomAction(computerAction);

    if (selectedAction === computerAction) {
      setResult("draw");
    } else if (selectedAction === "scissors" && computerAction === "rock") {
      setResult("lose");
    } else if (selectedAction === "rock" && computerAction === "paper") {
      setResult("lose");
    } else {
      setResult("win");
    }
  };

  useEffect(() => {
    if (result !== null) {
      return;
    }

    const actions: ("scissors" | "rock" | "paper")[] = [
      "scissors",
      "rock",
      "paper",
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setRandomAction(actions[currentIndex]);
      currentIndex = (currentIndex + 1) % 3;
    }, 1000);

    return () => clearInterval(interval);
  }, [result]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>剪刀石頭布</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>一局定勝負</Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
          gap: 24,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={
              randomAction === "scissors"
                ? images.scissors
                : randomAction === "rock"
                ? images.rock
                : images.paper
            }
            style={styles.actionButtonImage}
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>勝負結果</Text>
          {result === "win" && <Text style={styles.resultText}>你贏了</Text>}
          {result === "lose" && <Text style={styles.resultText}>你輸了</Text>}
          {result === "draw" && <Text style={styles.resultText}>平手</Text>}
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[
              styles.actionButton,
              selectedAction === "scissors" && styles.selectedActionButton,
            ]}
            onPress={() => handleActionButtonPress("scissors")}
          >
            <Image source={images.scissors} style={styles.actionButtonImage} />
          </Pressable>
          <Pressable
            style={[
              styles.actionButton,
              selectedAction === "rock" && styles.selectedActionButton,
            ]}
            onPress={() => handleActionButtonPress("rock")}
          >
            <Image source={images.rock} style={styles.actionButtonImage} />
          </Pressable>
          <Pressable
            style={[
              styles.actionButton,
              selectedAction === "paper" && styles.selectedActionButton,
            ]}
            onPress={() => handleActionButtonPress("paper")}
          >
            <Image source={images.paper} style={styles.actionButtonImage} />
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.readyButton} onPress={handleReadyButtonPress}>
        <Text style={styles.readyButtonText}>準備好了</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "blue",
    marginVertical: 12,
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultContainer: {
    backgroundColor: "lightgray",
    padding: 12,
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonsContainer: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  readyButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 5,
  },
  readyButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  selectedActionButton: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "green",
    transform: [{ scale: 1.2 }],
  },
  actionButtonImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
});

export default RockPaperScissorsScreen;
