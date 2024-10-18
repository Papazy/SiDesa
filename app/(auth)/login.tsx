import React from 'react';
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import bg from '../../assets/images/login-bg.png';
import logo from '../../assets/images/logo.png';
import { Link, useRouter } from 'expo-router';

const LoginPage = () => {

  const router = useRouter();


  const handleOnPress = () => {
    router.push('/main');
  }

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
            Masukkan email dan password akun anda
          </Text>
        </View>
        
        <View className="w-full px-8 pb-20">
          <TextInput
            placeholder="Username/Email"
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
          <TouchableOpacity
            style={{
              backgroundColor: '#333',
              borderRadius: 20,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleOnPress}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Masuk</Text>
          </TouchableOpacity>
          <Text className='text-center text-white mt-2'>Belum punya akun? <Link className="font-bold" href="/register">Register</Link></Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginPage;
