import { StyleSheet, Text, View } from "react-native";

function RockPaperScissorsScreen() {
  return (
    <View style={styles.container}>
      <Text>Rock Paper Scissors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default RockPaperScissorsScreen;
