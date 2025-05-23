import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const fetchToken = async() => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      if(token){
        router.replace({pathname:'/main'});
      }else{
        router.replace({pathname:'/onBoarding'});
      }
    }
    fetchToken();
  },[])

  if(isLoading) return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={'large'} color={'blue'} />
    </View>
  )
  return <Redirect href="/onBoarding" />;
}
