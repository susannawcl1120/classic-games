import { StyleSheet, View } from "react-native";

import RockPaperScissorsScreen from "@/screens/rockPaperScissors/rockPaperScissorsScreen";

function RockPaperScissors() {
  return (
    <View style={styles.container}>
      <RockPaperScissorsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default RockPaperScissors;
