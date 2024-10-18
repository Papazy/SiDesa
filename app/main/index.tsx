import React from 'react';
import { View, Text, Image, TextInput, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import bg from '@/assets/images/header.png'; // Sesuaikan dengan path gambar Anda
import logo from '@/assets/images/logo.png'; // Sesuaikan dengan path logo Anda
import destinasi1 from '@/assets/images/destinasi-1.png';
import destinasi2 from '@/assets/images/destinasi-2.png';
import colors from '@/assets/color';
import CardDest from '@/components/CardDest';
import { useRouter } from 'expo-router';

const destinations = [
  { id: 1, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 2, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
  { id: 3, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 4, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
  { id: 5, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
  { id: 6, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
  // Tambahkan data destinasi lainnya sesuai kebutuhan
];

export default function HomePage() {

  

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageBackground source={bg} resizeMode="cover"  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height:'87%' }}>
        <View style={{ padding: 16, paddingTop: 60 }}>
          <Image source={logo} style={{ width: 60, height: 60, marginBottom: 10, marginTop:20}} />
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff'}}>
            Dapatkan Pengalaman Liburan Terbaik
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 30,
              marginTop: 10,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            className='elevation'
          >
            <AntDesign name="search1" size={20} color="#999" />
            <TextInput
              placeholder="Cari"
              style={{ flex: 1, marginLeft: 10, color: '#000' }}
              
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </ImageBackground>

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: colors.title }}>
          Destinasi Terbaik
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }} className={`text-[${colors.text}`}>
          {destinations.map((dest) => (
            <CardDest key={dest.id} dest={dest} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
