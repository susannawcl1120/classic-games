import { StyleSheet, View } from "react-native";

import SicBoScreen from "@/screens/sicBo/sicBoScreen";

function SicBo() {
  return (
    <View style={styles.container}>
      <SicBoScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SicBo;
