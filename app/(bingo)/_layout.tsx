import { Stack } from "expo-router";

function BingoRootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="bingo" />
    </Stack>
  );
}

export default BingoRootLayout;
