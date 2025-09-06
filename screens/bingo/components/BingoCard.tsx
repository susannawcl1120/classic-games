import { slotSymbols } from "@/constants/bingo";
import { metrics } from "@/theme/metrics";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

interface BingoCardProps {
  spinning: boolean;
  targetSymbol: string;
  symbols?: string[];
  onSpinComplete?: () => void;
  durationMs?: number;
}

const WINDOW_HEIGHT = metrics.hp(100);
const ITEM_HEIGHT = WINDOW_HEIGHT;

function BingoCard({
  spinning,
  targetSymbol,
  symbols = slotSymbols,
  onSpinComplete,
  durationMs = 1600,
}: BingoCardProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  const extendedSymbols = useMemo(() => {
    const loops = 10;
    return Array.from({ length: loops }).flatMap(() => symbols);
  }, [symbols]);

  const stopIndex = useMemo(() => {
    const loops = Math.floor(extendedSymbols.length / symbols.length);
    const lastLoopStart = Math.max(0, (loops - 1) * symbols.length);
    const idxInBase = symbols.indexOf(targetSymbol);
    const idx = idxInBase >= 0 ? lastLoopStart + idxInBase : lastLoopStart;

    return Math.min(idx, extendedSymbols.length - 1);
  }, [extendedSymbols, symbols, targetSymbol]);

  useEffect(() => {
    if (!spinning) return;

    translateY.setValue(0);

    const targetOffset = -stopIndex * ITEM_HEIGHT;

    Animated.timing(translateY, {
      toValue: targetOffset,
      duration: durationMs,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      onSpinComplete?.();
    });
  }, [spinning, stopIndex, durationMs, translateY, onSpinComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {extendedSymbols.map((s, i) => (
            <View
              key={`${s}-${i}`}
              style={[styles.item, { height: ITEM_HEIGHT }]}
            >
              <Text style={[styles.symbol, { fontSize: ITEM_HEIGHT * 0.4 }]}>
                {s}
              </Text>
            </View>
          ))}
        </Animated.View>
        <View pointerEvents="none" style={styles.windowOverlay} />
      </View>
      <View pointerEvents="none" style={styles.outerBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: metrics.hp(100),
    width: metrics.wp(100),
  },
  window: {
    height: metrics.hp(100),
    width: metrics.wp(100),
    overflow: "hidden",
    borderRadius: 14,
    backgroundColor: "#111",
    alignItems: "center",
  },
  item: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  symbol: {
    color: "#fff",
    fontWeight: "bold",
  },
  windowOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  outerBorder: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#8B4513",
  },
});

export default BingoCard;
