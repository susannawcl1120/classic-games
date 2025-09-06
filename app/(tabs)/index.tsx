import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { images } from "@/constants/Images";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={images.homeBg} style={styles.homeBg} />}
    >
      <Link href="/(rockPaperScissors)/rock-paper-scissors">
        <ThemedText>Rock Paper Scissors</ThemedText>
      </Link>
      <Link href="/(bingo)/bingo">
        <ThemedText>Bingo</ThemedText>
      </Link>
      <Link href="/(sicBo)/sicBo">
        <ThemedText>Sic Bo</ThemedText>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  homeBg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
