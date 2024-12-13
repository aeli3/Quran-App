import { useRouter, Stack } from "expo-router";
import { useFonts } from "expo-font";
import Colors from "./src/utils/Color";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from "react-native";
import { LanguageProvider } from "./src/context/LanguageContext";

export default function RootLayout() {
  const queryClient = new QueryClient()
  const router = useRouter()

  const [fontsLoaded, error] = useFonts({
    'Poppins' : require('../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Stack
          screenOptions={{
            gestureEnabled: true,
            presentation: 'fullScreenModal',
            animation: 'slide_from_right',
            headerShown: true,
            statusBarHidden: true,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor:Colors.MAIN,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => {
              return (
                  <Pressable
                  onPressIn={() => router.push('/settings')}
                  android_ripple={{color: "rgba(103, 44, 188, 0.4)"}}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20}}
                  >
                    
                    <FontAwesome name="gear" size={24} color={Colors.MAIN} />
                  </Pressable>
              )
            } 
          }}>
        </Stack>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
