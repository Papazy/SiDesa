import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MenuCard from '@/components/MenuCard'; // Adjust the import path according to your project structure.
import { useRouter } from 'expo-router';

const SettingsPage = () => {
  const router = useRouter();

  const settingsData = [
    {
      title: 'Bahasa',
      description: 'Bahasa Indonesia',
      icon: 'globe',
      link: '/profile/language'
    },
    // {
    //   title: 'Notifikasi',
    //   description: 'Pesan, grup dan pemberitahuan lain',
    //   icon: 'bell',
    //   link: '/settings/notifications'
    // },
    {
      title: 'Bantuan',
      description: 'Pusat bantuan',
      icon: 'help-circle',
      link: '/profile/help'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      
      <View className="p-4">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-white rounded-full shadow"
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#008080" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-teal-600 mt-4">Pengaturan</Text>

        {/* Settings List */}
        <View className="mt-6">
          {settingsData.map((item, index) => (
            <MenuCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsPage;
