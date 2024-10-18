import React from 'react';
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import bg from '../../assets/images/login-bg.png';
import logo from '../../assets/images/logo.png';
import { Link } from 'expo-router';

const RegisterPage = () => {
  return (
    <View className="flex-1 w-full">
      <ImageBackground
        source={bg}
        resizeMode="cover"
        className="flex-1 justify-center items-center"
      >
        <View className="flex-1 justify-center items-center w-full">
          <Image source={logo} className="w-40 h-40 mb-8" />
        </View>
        
        <View>
          <Text className="text-gray-700 text-sm italic mb-2">
            Buatkan akun baru anda
          </Text>
        </View>
        <View className="w-full px-8 pb-20">
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            style={{
              backgroundColor: '#fff',
              opacity: 0.8,
              borderRadius: 20,
              paddingHorizontal: 16,
              marginBottom: 16,
              height: 50,
            }}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#ccc"
            style={{
              backgroundColor: '#fff',
              opacity: 0.8,
              borderRadius: 20,
              paddingHorizontal: 16,
              marginBottom: 16,
              height: 50,
            }}
          />
          <TextInput
            placeholder="Kata Sandi"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={{
              backgroundColor: '#fff',
              opacity: 0.8,
              borderRadius: 20,
              paddingHorizontal: 16,
              marginBottom: 16,
              height: 50,
            }}
          />
          <TextInput
            placeholder="Konfirmasi Kata Sandi"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={{
              backgroundColor: '#fff',
              opacity: 0.8,
              borderRadius: 20,
              paddingHorizontal: 16,
              marginBottom: 16,
              height: 50,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#333',
              borderRadius: 20,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Daftar</Text>
          </TouchableOpacity>
          <Text className='text-center text-white mt-2'>Sudah punya akun? <Link className="font-bold" href="/login">Login</Link></Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterPage;
