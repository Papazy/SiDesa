import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';


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
        <Image
          source={require('../../assets/images/user-avatar.png')}
          className="w-24 h-24 rounded-full"
          style={{ resizeMode: 'cover' }}
        />

        {/* Profile Name and Email */}
        <Text className="text-lg font-bold mt-4">NamaUser</Text>
        <Text className="text-gray-500">User@mail.com</Text>

        {/* Edit Profile Button */}
        <TouchableOpacity className="bg-teal-600 px-4 py-2 mt-4 rounded-md">
          <Text className="text-white">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <View className="mt-8">
        {/* Security */}
        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-2">
          <View className="flex-row items-center">
            <Feather name="lock" size={20} color="#008080" />
            <Text className="ml-4 text-gray-700">Keamanan</Text>
          </View>
          <Text className="text-gray-400">Privasi dan kata sandi</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-2">
          <View className="flex-row items-center">
            <Feather name="settings" size={20} color="#008080" />
            <Text className="ml-4 text-gray-700">Pengaturan</Text>
          </View>
          <Text className="text-gray-400">Data Pengguna</Text>
        </TouchableOpacity>

        {/* FAQ */}
        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg">
          <View className="flex-row items-center">
            <Feather name="help-circle" size={20} color="#008080" />
            <Text className="ml-4 text-gray-700">FAQ</Text>
          </View>
          <Text className="text-gray-400">Pusat Bantuan</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity className="bg-teal-600 px-4 py-2 mt-8 rounded-md mx-auto flex-row items-center">
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text className="text-white ml-2">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
