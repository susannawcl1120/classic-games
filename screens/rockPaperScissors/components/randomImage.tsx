import { ACTION_IMAGES, ACTIONS } from "@/constants/rockPaperScissors";
import { Action, GameResult } from "@/types/rockPaperScissors";
import { useEffect, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";

type Props = {
  result: GameResult;
  computerAction: Action | null;
  setComputerAction: (action: Action) => void;
};

function RandomImage({ result, computerAction, setComputerAction }: Props) {
  const currentImage = useMemo(() => {
    if (!computerAction) return null;
    if (result === "draw") return ACTION_IMAGES[computerAction];
    return ACTION_IMAGES[computerAction];
  }, [computerAction, result]);

  useEffect(() => {
    if (result !== null) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setComputerAction(ACTIONS[currentIndex]);
      currentIndex = (currentIndex + 1) % ACTIONS.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [result, setComputerAction]);

  return (
    <View style={styles.computerActionContainer}>
      {currentImage && (
        <Image source={currentImage} style={styles.computerActionImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default RandomImage;
