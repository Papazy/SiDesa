import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = (setter : any) => {
    setter((prev :any) => !prev);
  };

  const handleSubmit = () => {
    // Handle password change logic here, like API request.
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
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
        <Text className="text-lg font-bold text-teal-600 mt-4">Ubah Sandi</Text>

        {/* Input Fields */}
        <View className="mt-6">
          <View className="mb-4">
            <Text className="text-gray-700">Sandi Lama</Text>
            <View className="flex-row items-center border-b border-teal-600">
              <TextInput
                className="flex-1 py-2"
                secureTextEntry={!isOldPasswordVisible}
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Masukkan sandi lama"
              />
              <TouchableOpacity
                onPress={() => togglePasswordVisibility(setOldPasswordVisible)}
              >
                <MaterialIcons
                  name={isOldPasswordVisible ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#008080"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700">Konfirmasi Sandi Baru</Text>
            <View className="flex-row items-center border-b border-teal-600">
              <TextInput
                className="flex-1 py-2"
                secureTextEntry={!isNewPasswordVisible}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Masukkan sandi baru"
              />
              <TouchableOpacity
                onPress={() => togglePasswordVisibility(setNewPasswordVisible)}
              >
                <MaterialIcons
                  name={isNewPasswordVisible ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#008080"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700">Sandi Lama</Text>
            <View className="flex-row items-center border-b border-teal-600">
              <TextInput
                className="flex-1 py-2"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Konfirmasi sandi baru"
              />
              <TouchableOpacity
                onPress={() => togglePasswordVisibility(setConfirmPasswordVisible)}
              >
                <MaterialIcons
                  name={isConfirmPasswordVisible ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#008080"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Note */}
        <Text className="text-sm text-gray-500 mt-2">
          Penting: Gunakan setidaknya 8 karakter dengan campuran huruf kapital dan angka.
        </Text>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="mt-6 bg-teal-600 py-3 rounded-lg"
        >
          <Text className="text-center text-white font-bold">Ubah Sandi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordPage;
