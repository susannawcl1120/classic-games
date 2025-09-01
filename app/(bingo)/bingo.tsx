import { StyleSheet, View } from "react-native";

import BingoScreen from "@/screens/bingo/bingoScreen";

function Bingo() {
  return (
    <View style={styles.container}>
      <BingoScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Bingo;
