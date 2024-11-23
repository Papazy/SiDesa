import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE  } from 'react-native-maps';
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useRouter } from 'expo-router';

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

const Maps = () => {

  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<any | null>({
    latitude: 0,
    longitude: 0,
  });
  // Fetch data dari API saat komponen dimuat

  useFocusEffect(
    useCallback(()=>{
      const fetchDestinations = async () => {
        try {
          const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/places/?skip=0&limit=100');
          if (response.ok) {
            const data = await response.json();
            setDestinations(data);
  
            setSelectedDestination({
              latitude: parseFloat(data[0].latitude),
              longitude: parseFloat(data[0].longitude),
            })
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
    }, [])
  )
  useEffect(() => {
   
  }, []);


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


  const openGoogleMaps = (destination : any) => {
    const title=destination.name
    const thisLatitude=destination.latitude
    const thisLongitude=destination.longitude

    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${thisLatitude},${thisLongitude}`;
    const label = title;
    const url :any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}  
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
            onCalloutPress={() => openGoogleMaps(destination)}
          >
            <MyCustomMarkerView image_url={destination.image_url} />
            <Callout tooltip>
              <CustomCalloutView
                title={destination.name}
                description={destination.location_name}
                image_url={destination.image_url}
                latitude={destination.latitude}
                longitude={destination.longitude}
                id={destination.id}
              />
            </Callout>
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Lokasi Anda"
          description={"Lokasi Anda"}
        />

      </MapView>
    </View>
  );
};

// Komponen untuk menampilkan custom marker
const MyCustomMarkerView = ({ image_url }: any) => {
  return (
    <View style={styles.markerWrapper}>
      <View style={styles.markerContainer}>
        <Image source={{ uri: image_url }} style={styles.markerImage} />
      </View>
      <View style={styles.markerTriangle} />
    </View>
  );
};


const CustomCalloutView = ({ title, description, image_url, latitude, longitude,id }: any) => {

  const openGoogleMaps = () => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = title;
    const url :any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  };

  const router = useRouter();
  const openDetail =() =>{
    router.replace(`/detail/${id}`);
    return
  }




  return (
    <View style={styles.calloutContainer}>
      <Image resizeMode='contain' source={{ uri: image_url }} style={styles.calloutImage} />
      <View style={styles.calloutTextContainer}>
        <Text style={styles.calloutTitle}>{title}</Text>
        <Text style={styles.calloutDescription}>{description}</Text>

        <TouchableOpacity style={styles.button} onPress={() => openGoogleMaps()}>
        <FontAwesome name="map-marker" size={24} color="white" /><Text style={styles.buttonText}>Open in Google Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openDetail(id)}>
        <MaterialIcons name="info-outline" size={24} color="white" /><Text style={styles.buttonText} >Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  markerWrapper: {
    alignItems: 'center',
  },
  markerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 5,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  markerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    marginTop: -1,
  },

  calloutContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: 220,
  },
  calloutImage: {
     width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
    
  },
  calloutTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  calloutDescription: {
    fontSize: 12,
    color: '#555',
  },
  button: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign:'center'
  },
});

export default Maps;
