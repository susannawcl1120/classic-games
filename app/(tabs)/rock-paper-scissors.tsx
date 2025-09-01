import { StyleSheet, View } from "react-native";

import RockPaperScissorsScreen from "@/screens/rockPaperScissors/rockPaperScissorsScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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
