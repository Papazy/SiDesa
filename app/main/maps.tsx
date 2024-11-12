import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

type DestinationType = {
  name: string;
  description: string;
  location_name: string;
  latitude: string;
  longitude: string;
  image_url: string;
  id: number;
  distance: number | null;
  average_rating: number;
};

type MarkerType = {
  title: string;
  description: string;
  image_url: string;
};

const Maps = () => {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);

  // Fetch data dari API saat komponen dimuat
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'/places/?skip=0&limit=100');
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
          console.log(data);
        } else {
          console.log('Tidak ada data');
          alert("Tidak ada data");
        }
      } catch (error) {
        console.log(error);
        alert("Terjadi kesalahan saat mengambil data");
      }
    };

    fetchDestinations();
  }, []);

  return (
    <View className="flex-1 w-full h-full">
      <MapView
        className="flex-1 w-full h-full"
        initialRegion={{
          latitude: 5.694587,
          longitude: 95.078116,
          latitudeDelta: 0.2,
          longitudeDelta: 0.15,
        }}
      >
        {/* Render Marker secara dinamis berdasarkan data dari API */}
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            coordinate={{
              latitude: parseFloat(destination.latitude),
              longitude: parseFloat(destination.longitude),
            }}
          >
            {/* <MyCustomMarkerView 
              title={destination.name} 
              description={destination.location_name} 
              image_url={destination.image_url} 
            /> */}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

// Komponen untuk menampilkan custom marker
const MyCustomMarkerView = (props: MarkerType) => {
  return (
    <View className="bg-white rounded px-2 py-1 items-center">
      <Image source={{ uri: props.image_url }} className="w-6 h-6" />
      <Text className="text-[8px]">{props.title}</Text>
    </View>
  );
};

export default Maps;
