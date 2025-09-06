import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

function CountDown() {
  const [count, setCount] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
      if (count === 0) {
        setCount(10);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return <Text style={styles.container}>{count}</Text>;
}

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "#FFF",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

export default CountDown;
