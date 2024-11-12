import React, { useState } from 'react';
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import bg from '../../assets/images/login-bg.jpg';
import logo from '../../assets/images/logo.png';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { LoadingModal, NotificationModal } from '@/components/Modal';
import { Ionicons } from '@expo/vector-icons';

const LoginPage = () => {

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('error');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);



  const {login} = useAuth();

  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const handleOnPress = async () => {
    setIsLoading(true);
    try{
      await login({username: data.email, password:data.password});
    }catch(err){
      setIsLoading(false);
      console.log(err)
      setNotificationType('error');
      setNotificationMessage('Login Gagal, Periksa kembali email dan password anda');
      setShowNotification(true);
    }
    setIsLoading(false);
  }
  
  return (
    <View className="flex-1 w-full">

      {notificationType === "error" && <NotificationModal type="error" message={notificationMessage} onClose={()=>setShowNotification(false)} visible={showNotification}/>}
      {notificationType === "success" && <NotificationModal type="success" message={notificationMessage} onClose={()=>setShowNotification(false)} visible={showNotification}/>}
      {notificationType === "notif" && <NotificationModal type="notif" message={notificationMessage} onClose={()=>setShowNotification(false)} visible={showNotification}/>}
      {isLoading && <LoadingModal visible={isLoading} />}

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
            value={data.email}
            onChangeText={(val) => setData({ ...data, email: val })}
          />
           <View
            style={{
              backgroundColor: '#fff',
              opacity: 0.8,
              borderRadius: 20,
              paddingHorizontal: 16,
              marginBottom: 16,
              height: 50,
              justifyContent:'center'
            }}
          >

          <TextInput
            placeholder="Kata Sandi"
            placeholderTextColor="#a3a2a2"
            secureTextEntry ={!visiblePassword}
            style={{ 
              marginRight:20
             }}
            value={data.password}
            onChangeText={(val) => setData({ ...data, password: val })}
            />
            <TouchableOpacity
              onPress={() => setVisiblePassword(!visiblePassword)}
              style={{
                position: 'absolute',
                right: 10,
              }}
            >
              <Ionicons name={visiblePassword ? 'eye-off' : 'eye'} size={20} color="#333" />
            </TouchableOpacity>
            </View>
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
