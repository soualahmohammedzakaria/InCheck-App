import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { LogBox, Text } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ToastProvider
      textStyle={{ fontFamily: "Poppins-Medium" }}
      successIcon={<Text>✅</Text>}
      dangerIcon={<Text>🚫</Text>}
    >
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(authed)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(routes)/addevent"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(routes)/eventdetails"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(routes)/scaneventcode"
            options={{ headerShown: false }}
          />
        </Stack>
      </QueryClientProvider>
    </ToastProvider>
  );
}
