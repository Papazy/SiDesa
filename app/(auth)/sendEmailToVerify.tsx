import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

const sendEmailToVerify = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { sendOtp } = useAuth();

  const handleSendOtp = async () => {
    if (!email) {
      alert('Silakan masukkan email Anda.');
      return;
    }

    try {
      // Assuming `sendOtp` will send the OTP and return a success message
      await sendOtp(email);
      // Navigate to the OTP verification page and pass the email
      router.push({
        pathname: '/otp',
        params: { email }
      });
    } catch (error) {
      console.log(error);
      alert('Gagal mengirim OTP, coba lagi.');
    }
  };

  return (
    <View className="flex-1 bg-white px-4 justify-center items-center">
      <Text className="text-teal-600 text-2xl font-bold mb-12">Masukkan Email Anda</Text>
      <Text className="text-gray-700 text-center mb-8">Masukkan email Anda untuk mengirimkan kode verifikasi</Text>

      <TextInput
        className="w-full h-12 border-b-2 border-gray-300 text-lg px-2 mb-10"
        placeholder="Masukkan email Anda"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        className="bg-teal-600 py-3 px-6 rounded-lg shadow-lg"
        onPress={handleSendOtp}
      >
        <Text className="text-white text-base font-semibold">Kirim OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default sendEmailToVerify;
