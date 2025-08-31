import { StyleSheet, View } from "react-native";

import RockPaperScissorsScreen from "@/screens/rockPaperScissors/rockPaperScissorsScreen";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <RockPaperScissorsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
