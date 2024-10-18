import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  duration: string;
  reviews: string;
  image: any;
}

const InfoCard = ({ icon, text }: { icon: any; text: string }) => {
  return (
    <View style={styles.infoCard} className="mx-1 justify-center items-center">
      {icon}
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
};

const BookmarkIcon = ({ isBookmarked, onPress }: { isBookmarked: boolean; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name={isBookmarked ? 'bookmark' : 'bookmark-border'}
        size={30}
        color="#000"
      />
    </TouchableOpacity>
  );
};

const DetailPage = ({ route }: { route: any }) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const dest = {
    id: 1,
    name: 'Pantai Nipah',
    location: 'Desa Gugop',
    rating: 4.9,
    duration: '3.5h',
    reviews: '12.4k',
    description:
      'Pantai yang terletak di Gampong (Desa) Rabo, Pulo Nasi, Kecamatan Pulo Aceh, Provinsi Aceh Besar ini memiliki keindahan alam yang spektakuler\nPantai nan indah dengan potensi wisata menawarkan anda ketenangan, memanjakan mata anda dengan panorama laut biru dan pasirnya yang lembut dan putih.\nPantai ini menjadi daya tarik tersendiri, jika cuaca sedang bagus, anda bisa melihat pada sisi timur laut Gunung Seulawah, salah satu gunung tertinggi di Aceh.',
    image: 'url',
  };

  const handleBookmarkToggle = async () => {
    try {
      // Toggle bookmark state
      const newBookmarkState = !isBookmarked;
      setIsBookmarked(newBookmarkState);

      // Make an API call to update the bookmark status
      const response = await fetch('http://your-api-url/bookmark', {
        method: 'POST', // or 'PUT' if you're updating an existing bookmark
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destinationId: dest.id,
          isBookmarked: newBookmarkState,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bookmark status');
      }

      Alert.alert('Success', `Bookmark ${newBookmarkState ? 'added' : 'removed'} successfully!`);
    } catch (error) {
      // Handle the error and revert the state if needed
      setIsBookmarked((prev) => !prev);
      Alert.alert('Error', 'Failed to update bookmark. Please try again.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ position: 'relative' }}>
        <Image source={require('../../assets/images/destinasi-1.png')} style={{ width: '100%', height: 250 }} />
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: '#fff',
            padding: 8,
            borderRadius: 20,
          }}
        >
          <AntDesign name="arrowleft" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 16 }}>
        <View className="flex-1 flex-row justify-between items-center">
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{dest.name}</Text>
          <BookmarkIcon isBookmarked={isBookmarked} onPress={handleBookmarkToggle} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <View className="flex-1 flex-row items-center gap">
            <InfoCard icon={<MaterialIcons name="location-on" size={20} color="#008080" />} text={dest.duration} />
            <InfoCard icon={<AntDesign name="star" size={20} color="#FFD700" />} text={dest.rating.toString()} />
          </View>
        </View>

        <Text style={{ fontSize: 14, color: '#666', marginBottom: 16, lineHeight:20 }}>
          {dest.description}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = {
  infoCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 80,
    elevation: 2,
  },
  infoText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
};

export default DetailPage;
