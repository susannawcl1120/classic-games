import { Stack } from "expo-router";

function RockPaperScissorsRootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="rock-paper-scissors" />
    </Stack>
  );
}

export default RockPaperScissorsRootLayout;
