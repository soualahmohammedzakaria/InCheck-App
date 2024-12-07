import { SplashScreen, Stack } from 'expo-router';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  
  const [fontsLoaded, error] = useFonts({
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });

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
      textStyle={{ fontFamily: 'Poppins-Medium' }}
      successIcon={<Text>✅</Text>}
      dangerIcon={<Text>🚫</Text>}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(authed)" options={{ headerShown: false }} />
        <Stack.Screen name="(routes)/addevent" options={{ headerShown: false }} />
        <Stack.Screen name="(routes)/eventdetails" options={{ headerShown: false }} />
        <Stack.Screen name="(routes)/scaneventcode" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
}