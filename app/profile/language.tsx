import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// You might use Context, Redux, or AsyncStorage to persist the language preference.
// For this example, I'll use local state just to demonstrate the idea.

const LanguagePage = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Function to handle language selection
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    Alert.alert('Coming Soon', `Fitur ini akan tersedia nanti`);
    // Alert.alert('Bahasa Terpilih', `Anda telah memilih bahasa ${language}`);
    // Save the language preference here if needed, e.g., AsyncStorage or Context
  };

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
        <Text className="text-lg font-bold text-teal-600 mt-4">Pilih Bahasa</Text>

        {/* Language Selection Options */}
        <View className="mt-6">
          <TouchableOpacity
            onPress={() => handleLanguageSelect('Bahasa Indonesia')}
            className="p-4 bg-gray-100 rounded-md shadow mb-4"
          >
            <Text className="text-base font-semibold text-gray-800">Bahasa Indonesia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLanguageSelect('English')}
            className="p-4 bg-gray-100 rounded-md shadow mb-4"
          >
            <Text className="text-base font-semibold text-gray-800">English</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => handleLanguageSelect('العربية')}
            className="p-4 bg-gray-100 rounded-md shadow mb-4"
          >
            <Text className="text-base font-semibold text-gray-800">العربية (Arabic)</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default LanguagePage;
