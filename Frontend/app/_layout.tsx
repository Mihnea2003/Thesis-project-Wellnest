import { usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const pathname = usePathname(); 

  
  const isAuthOrSetup =
    pathname.startsWith('/auth') || pathname.startsWith('/setup');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isAuthOrSetup ? (
        <Stack>
          <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/Register" options={{ headerShown: false }} />
          <Stack.Screen name="setup/SetAge" options={{ headerShown: false }} />
          
          <Stack.Screen
            name="setup/SetCalories"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="setup/SetGoal" options={{ headerShown: false }} />
          <Stack.Screen
            name="setup/SetHeight"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="setup/SetWeight" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Drawer>
          <Drawer.Screen name="(drawer)" options={{ headerShown: false }} />
        </Drawer>
      )}
    </GestureHandlerRootView>
  );
}
