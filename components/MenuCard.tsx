import React from 'react';
import { Text, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';  
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface MenuProps {
  title: string;
  description: string;
  icon: any;
  link: any;
}


const MenuCard = ({ title, description, icon, link } : MenuProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-2"
      onPress={() => router.push(link)}
    >
      <View className='flex-1 flex-row justify-between items-center pr-3'>

      <View className="flex-row items-center ">
        <Feather name={icon} size={20} color="#008080" />
        <View className='flex-1 justify-start ml-3'>
        <Text className=" text-gray-700">{title}</Text>
       <Text className="text-gray-400 text-xs">{description}</Text>
      </View>
        </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#008080" />
      </View>
    </TouchableOpacity>
  );
}

export default MenuCard