import { Pressable, StyleSheet, Text, View } from "react-native";

function RockPaperScissorsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>剪刀石頭布</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>一局勝負</Text>
      </Pressable>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>勝負結果</Text>
        <Text style={styles.resultText}>你贏了</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>剪刀</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>石頭</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>布</Text>
        </Pressable>
      </View>
      <Pressable style={styles.readyButton}>
        <Text style={styles.readyButtonText}>準備好了</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#f8e50b",
    padding: 12,
    borderRadius: 5,
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
});

export default RockPaperScissorsScreen;
