import AuthProvider from "@/hooks/useAuth";
import { Stack } from "expo-router";



export default function RootLayout() {


  

  return (
    <AuthProvider>
    <Stack  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onBoarding" options={{ headerShown:false }} />
      <Stack.Screen name="(auth)" options={{ headerShown:false }} />
      <Stack.Screen name="main" options={{ headerShown:false }} />
      {/* <Stack.Screen name="profile" options={{ headerShown:false }} /> */}
    </Stack>
      </AuthProvider>
  );
}
