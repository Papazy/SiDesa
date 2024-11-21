import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";


export default function AuthLayout() {

  const router = useRouter();
  const {token} = useAuth();

    if(token){
      router.replace({pathname:'/main'});
    }


  return (
    <Stack  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="login" options={{ headerShown: false }}/>
      <Stack.Screen name="register" options={{ headerShown: false }}/>
      <Stack.Screen name="otp" options={{ headerShown: false }}/>
      <Stack.Screen name="sendEmailToVerify" options={{ headerShown: false }}/>
    </Stack>
  );
}
