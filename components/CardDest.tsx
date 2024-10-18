import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export interface Destination {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: any;
}

const CardDest = ({ dest }: { dest: Destination }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      key={dest.id}
      style={{
        width: '48%',
        marginBottom: 16,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
      }}

      onPress={() => router.push(`/detail/${dest.id}`)}
    >
      <Image source={dest.image} style={{ width: '100%', height: 120 }} />
      <View style={{ padding: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>{dest.name}</Text>
        <Text style={{ color: '#888', fontSize: 12 }}>{dest.location}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text style={{ marginLeft: 4, color: '#888' }}>{dest.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardDest;
