import React from 'react';
import { View, Text, ScrollView,TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';



const HelpPage = () => {
  const router = useRouter();

  const copyToClipboard = () => {
    Clipboard.setStringAsync('ppkormawahimatgf@gmail.com');
    Alert.alert('Berhasil', 'Email telah disalin ke clipboard');
  };


  const faqData = [
    {
      question: 'Bagaimana cara menggunakan fitur peta?',
      answer:
        'Anda dapat menggunakan fitur peta untuk melihat marker desa wisata. Klik marker untuk melihat informasi detail tentang desa tersebut.',
    },
    {
      question: 'Bagaimana cara mengganti foto profil?',
      answer:
        'Anda bisa mengganti foto profil dengan mengunjungi halaman profil, kemudian klik pada foto profil Anda dan pilih foto baru dari galeri Anda.',
    },
    {
      question: 'Bagaimana cara mengganti password atau username?',
      answer:
        'Anda bisa mengganti password atau username melalui halaman profil dengan memilih opsi "Edit Profil".',
    },
    {
      question: 'Bagaimana cara melakukan filter di halaman utama?',
      answer:
        'Di halaman utama, gunakan fitur filter di bagian atas untuk mencari desa wisata berdasarkan kriteria yang Anda inginkan.',
    },
    {
      question: 'Bagaimana cara memberikan rating di halaman detail wisata?',
      answer:
        'Anda bisa memberikan rating pada desa wisata di halaman detail wisata dengan mengklik jumlah bintang sesuai dengan pengalaman Anda.',
    },
    {
      question: 'Bagaimana cara menandai desa sebagai bookmark?',
      answer:
        'Di halaman detail wisata, Anda dapat menandai desa sebagai bookmark dengan mengklik ikon bookmark. Desa wisata yang ditandai akan muncul di daftar favorit Anda.',
    },
  ];

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
        <Text className="text-lg font-bold text-teal-600 mt-4">Bantuan</Text>

        {/* Contact Information */}
        <View className="mt-6 bg-gray-100 p-4 rounded-md">
          <Text className="text-base font-semibold text-gray-800">Hubungi Kami</Text>
          <TouchableOpacity onPress={copyToClipboard} className='flex-1  items-center flex-row'>
          
            <Text className="text-base font-bold text-gray-600 mt-2 mr-1">
              Email :
            </Text>
            <Text className="text-base text-gray-600 mt-2 underline">
               ppkormawahimatgf@gmail.com
            </Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View className="mt-8">
          <Text className="text-lg font-bold text-teal-600">FAQ </Text>
          {faqData.map((item, index) => (
            <View key={index} className="mt-4 bg-gray-50 p-4 rounded-md shadow">
              <Text className="text-base font-semibold text-gray-800">{item.question}</Text>
              <Text className="text-sm text-gray-600 mt-2">{item.answer}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HelpPage;
