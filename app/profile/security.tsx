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
      title: 'Aktivitas keamanan terbaru',
      description: 'Perangkat baru iPhone 14 masuk ke akun anda',
      icon: 'activity',
      link: '/profile/security/recent-activity', // Replace with the actual route
    },
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
      link: '/profile/security/email', // Replace with the actual route
    },
    // {
    //   title: 'Nomor telepon Pemulihan',
    //   description: '0896-2448-2948',
    //   icon: 'phone',
    //   link: '/profile/security/recovery-phone', // Replace with the actual route
    // },
  ];

  // const connectedDevices = [
  //   {
  //     title: 'iPhone 14',
  //     description: '',
  //     icon: 'smartphone',
  //     link: '/profile/security/connected-devices', // Replace with the actual route
  //   },
  //   {
  //     title: 'Windows',
  //     description: '',
  //     icon: 'monitor',
  //     link: '/profile/security/connected-devices', // Replace with the actual route
  //   },
  // ];

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

      {/* Connected Devices Section */}
      {/* <View className="p-4">
        <Text className="text-teal-600 font-bold mb-2">Perangkat yang terhubung</Text>
        {connectedDevices.map((device, index) => (
          <MenuCard
            key={index}
            title={device.title}
            description={device.description}
            icon={device.icon}
            link={device.link}
          />
        ))}
      </View> */}
    </ScrollView>
  );
};

export default SecurityPage;
