import { Stack } from "expo-router";

function SicBoRootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="sicBo" />
    </Stack>
  );
}

export default SicBoRootLayout;
