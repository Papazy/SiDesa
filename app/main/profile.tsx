import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import MenuCard from '@/components/MenuCard';

// User Data
const userData = {
  id: 1,
  name: 'NamaUser',
  email: 'User@mail.com',
  profileImage: require('../../assets/images/user-avatar.png'), 
};

const menuOptions= [
  {
    id: 1,
    title: 'Keamanan',
    description: 'Privasi dan kata sandi',
    icon: 'lock',
    link: '/profile/security',
  },
  {
    id: 2,
    title: 'Pengaturan',
    description: 'Data Pengguna',
    icon: 'settings',
    link: '/profile/settings',
  },
  {
    id: 3,
    title: 'FAQ',
    description: 'Pusat Bantuan',
    icon: 'help-circle',
    link: '/profile/faq',
  },
]



const Profile = () => {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="items-center mt-4">
        {/* Back Button */}
        <TouchableOpacity 
          className="absolute left-4 top-4 p-2 bg-white rounded-full shadow"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#008080" />
        </TouchableOpacity>

        {/* Profile Image */}
        <Text className="text-lg font-bold mt-4">Profile</Text>
        <View className="border rounded-full m-0 p-0 mt-5">

        <Image
          source={userData.profileImage}
          className="w-24 h-24 rounded-full m-0 p-0"
          style={{ resizeMode: 'cover' }}
          />
          </View>

        {/* Profile Name and Email */}
        <Text className="text-lg font-bold mt-4">{userData.name}</Text>
        <Text className="text-gray-500">{userData.email}</Text>

        {/* Edit Profile Button */}
        <TouchableOpacity className="bg-teal-600 px-4 py-2 mt-4 rounded-md">
          <Text className="text-white">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <View className="mt-8">
        {menuOptions.map((option) => (
          <MenuCard key={option.id} {...option} />
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity className="bg-teal-600 px-4 py-2 mt-28 rounded-md mx-auto flex-row items-center">
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text className="text-white ml-2">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
