import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, Image, TextInput, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Animated, Linking, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import bg from '@/assets/images/header.jpg'; 
import logo from '@/assets/images/logo.png'; 
import destinasi1 from '@/assets/images/destinasi-1.jpg';
import destinasi2 from '@/assets/images/destinasi-2.jpg';
import colors from '@/assets/color';
import CardDest from '@/components/CardDest';
import { useRouter } from 'expo-router';
import { DestinationType } from '@/types/Destination';
import * as Location from 'expo-location'
import { Alert } from 'react-native';
import { getDistanceBetweenPlaces } from '@/helper/getDistanceBetweenPlaces';


// const destinations = [
//   { id: 1, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
//   { id: 2, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
//   { id: 3, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
//   { id: 4, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
//   { id: 5, name: 'Pantai Nipah', location: 'Desa Gugop', rating: 4.9, image: destinasi1 },
//   { id: 6, name: 'Pantai Mata Ie', location: 'Desa Gugop', rating: 4.9, image: destinasi2 },
// ];

export default function HomePage() {
  // Animasi Pindah
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedInputValue = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<DestinationType[]>([]);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedInputValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedInputValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Interpolasi posisi ikon untuk membuat animasi bergerak
  const iconPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 230], 
  });

  const inputPosition = animatedInputValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  })

  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(process.env.EXPO_PUBLIC_API_URL + '/places/?skip=0&limit=100');
          if (res.ok) {
            const data = await res.json();
            setDestinations(data);
            setFilteredDestinations(data); // Set hasil awal
          } else {
            console.log('Tidak Ada data');
            alert("Tidak Ada data");
          }
        } catch (err) {
          console.log(err);
          alert("Tidak Ada data");
        }
        setIsLoading(false);
      };

      fetchData();
    }, []) 
  );


  const [currentLocation, setCurrentLocation] = useState<any | null>({
    latitude: 5.741861,
    longitude: 95.046500,
  });
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location Loading.....');
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, [])
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert('Location not enabled', 'Please enable your Location', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      setLocationServicesEnabled(enabled)
    }
  }
  //get current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow the app to use the location services', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }

    //get current position lat and long
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords)

    if (coords) {
      const { latitude, longitude } = coords;
      console.log(latitude, longitude);
      setLatitude(latitude);
      setLongitude(longitude);

      setCurrentLocation({
        latitude,
        longitude
      })

      // mendapatkan alamat dari latitude dan longitude
      let responce = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      console.log(responce);
      for (let item of responce) {
        let address = `${item.name} ${item.city} ${item.postalCode}`
        setDisplayCurrentAddress(address)
      }
    }
  }

  // Filter 
  useEffect(() => {
    const filtered = destinations.filter(dest =>
      dest.name.toLowerCase().includes(searchText.toLowerCase()) ||
      dest.location_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [searchText, destinations]);

  
  

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
        width:'80%',
      }}
      className="elevation"
    >
      {/* Animated.View untuk ikon yang dapat berpindah */}
      <Animated.View style={{ transform: [{ translateX: iconPosition }] }}>
        <AntDesign name="search1" size={20} color="#999" />
      </Animated.View>
      
      <Animated.View style={{ width:'100%', transform: [{ translateX: inputPosition }] }}>
      <TextInput
        placeholder="Cari"
        style={{ flex: 1, marginLeft: 10, color: '#000', width:'100%' }}
        placeholderTextColor="#999"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={text => setSearchText(text)}
        />
        </Animated.View>
    </View>
        </View>
      </ImageBackground>
      
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: colors.title }}>
          Destinasi Terbaik
        </Text>
        {isLoading ? (<ActivityIndicator size="large" color={colors.primary} />) : (

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }} className={`text-[${colors.text}`}>
          {filteredDestinations.map((dest) => (
            <CardDest key={dest.id} dest={dest} latitude={latitude} longitude={longitude}/>
          ))}
        </View>
        )}
      </View>
    </ScrollView>
  );
}
