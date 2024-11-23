import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import gambar from '@/assets/images/user-avatar.png';
import axios from 'axios';

const EmailProfile = () => {
  const { user, updateUser, token }: any = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photo_url || null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUrl(result.assets[0].uri);
    }
  };

 

  // Update 
  const userUpdateData = {
    name: name,
    password: user.password, 
    is_admin: user.is_admin
  };
  const handleSave = async () => {
    try {
  
      const responseUser = await fetch('http://98.70.50.91:8000/users/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userUpdateData),
      });
  
      if (!responseUser.ok) {
        const dataRes = await responseUser.json();
        console.log(dataRes);
        throw new Error("Failed to update user data");
      }
  

      if (photoUrl && photoUrl !== user.photo_url) {
        const formData = new FormData();
        formData.append('photo', {
          uri: photoUrl,
          name: 'profile_photo.jpg',
          type: 'image/jpeg',
        });
  
        const responsePhoto = await fetch('http://98.70.50.91:8000/users/auth/me/photo', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (!responsePhoto.ok) {
          throw new Error("Failed to update profile photo");
        }
      }
  
      Alert.alert("Profile Updated", "Your profile has been successfully updated!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating your profile.");
      console.error(error);
    }
  };
  

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

        <Text className="text-lg font-bold mt-4">Edit Profile</Text>

        {/* Profile Image */}
        <TouchableOpacity onPress={pickImage} className="mt-5 flex-1 justify-center items-center">
          <View className="border rounded-full overflow-hidden w-24 h-24">
            <Image
              source={photoUrl ? { uri: photoUrl } : gambar}
              className="w-24 h-24 rounded-full"
              style={{ resizeMode: 'cover' }}
            />
          </View>
          <Text className="text-teal-600 mt-2">Change Profile Picture</Text>
        </TouchableOpacity>

        {/* Name Input */}
        <View className="w-full mt-6">
          <Text className="text-gray-700 mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className="border rounded-lg p-3 bg-gray-100"
          />
        </View>

        {/* Email Input */}
        <View className="w-full mt-4">
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            className="border rounded-lg p-3 bg-gray-100"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-teal-600 px-4 py-2 mt-6 rounded-md w-full"
          onPress={handleSave}
        >
          <Text className="text-white text-center">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EmailProfile;
