import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import colors from '@/assets/color';
import { useAuth } from '@/hooks/useAuth';
import { userType } from '@/types/Profile';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {token, getLoginUser} = useAuth();
  const [user, setUser] = useState<userType>({
    email: "",
    id: 0,
    is_active: false,
    is_admin: false,
    name: "",
    photo_url: null,
    saved_places: []
  })

  useEffect(()=>{
    const fetchData = async() => {
      const userData = await getLoginUser();
      // console.log("Dapat di change password: ", userData)
      setUser(userData);
    }
    fetchData();
  },[])

  const router = useRouter();

  const togglePasswordVisibility = (setter :any) => {
    setter((prev :any) => !prev);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setModalMessage('Password baru dan konfirmasi password tidak cocok.');
      setModalVisible(true);
      return;
    }

    try {

      console.log("User Data di Change ", user)
      const data = {
        name: user.name,
        password: newPassword,
        is_admin: user.is_admin, 
      }
      console.log("DATA to change", data);
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/users/auth/me?secret_key='+process.env.EXPO_PUBLIC_API_KEY, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setModalMessage('Kata sandi anda berhasil diubah');
      } else {
        const dataRes = await response.text();
        console.log(response);
        setModalMessage(`Gagal mengubah sandi: ${dataRes || 'Terjadi kesalahan, Periksa data kembali'}`);
      }
    } catch (error) {
      console.log(error)
      setModalMessage('Gagal mengubah sandi: Terjadi kesalahan pada server.');
    }
    setModalVisible(true);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Modal for success or error message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className='modal-view absolute justify-center items-center w-full h-screen z-50'>
          <View className='bg-slate-100 p-10 rounded-xl elevation'>
            <Text className={`text-xl text-center`} style={{ color: colors.title }}>
              {modalMessage}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 bg-teal-600 py-2 rounded-lg"
            >
              <Text className="text-center text-white font-bold">Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
            <Text className="text-gray-700">Sandi Baru</Text>
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
            <Text className="text-gray-700">Konfirmasi Sandi Baru</Text>
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
          Tips: Gunakan setidaknya 8 karakter dengan campuran huruf kapital dan angka.
        </Text>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={()=>handleSubmit()}
          className="mt-6 bg-teal-600 py-3 rounded-lg"
        >
          <Text className="text-center text-white font-bold">Ubah Sandi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordPage;
