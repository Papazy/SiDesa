import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MenuCard from '@/components/MenuCard';  
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
const SecurityPage = () => {
  const router = useRouter();

  const {getLoginUser} = useAuth();
  const [user, setUser] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(
    () => {
      const fetchUser = async () => {
        const user = await getLoginUser();
        setUser(user);
      }
      fetchUser();
    }, []
  )
  // Data for the security options
  const securityOptions = [
    {
      title: 'Sandi',
      description: 'Ubah Sandi anda',
      icon: 'lock',
      link: '/profile/changePassword', // Replace with the actual route
    },
    {
      title: 'Email',
      description: user?.email,
      icon: 'mail',
      link: '/profile/email', // Replace with the actual route
    },
   
  ];

  

  if(isLoading) return <Text>Loading...</Text>

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Back Button */}
      <View className="p-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 bg-white rounded-full shadow"
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#008080" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-bold">Keamanan</Text>
      </View>

      {/* Security Options */}
      <View className="p-4">
        {securityOptions.map((option, index) => (
          <MenuCard
            key={index}
            title={option.title}
            description={option.description}
            icon={option.icon}
            link={option.link}
          />
        ))}
      </View>

    
    </ScrollView>
  );
};

export default SecurityPage;
