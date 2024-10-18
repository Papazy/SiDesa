import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { useRouter } from 'expo-router'
import bg from '@/assets/images/header.png'; 
import logo from '@/assets/images/logo.png'; 
import destinasi1 from '@/assets/images/destinasi-1.png';
import destinasi2 from '@/assets/images/destinasi-2.png';
import colors from '@/assets/color';
import CardDest from '@/components/CardDest';

const destinations = [
  { id: 1, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 2, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
  { id: 3, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 4, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
  { id: 5, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 6, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
  { id: 7, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 8, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
  { id: 9, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 10, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
];

const bookmark = () => {
  const router = useRouter()
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

        {/* Profile Image */}
        <Text className="text-lg font-bold mt-4">Disimpan</Text>
      </View>
      <View style={{ padding: 16 }}>
      
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop:5 }} className={`text-[${colors.text}`}>
          {destinations.map((dest) => (
            <CardDest key={dest.id} dest={dest} />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default bookmark