import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal, Button, Platform, Linking } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DestinationType } from '@/types/Destination';
import colors from '@/assets/color';
import { NotificationModal } from '@/components/Modal';
import { useAuth } from '@/hooks/useAuth';

const InfoCard = ({ icon, text, onPress }: { icon: any; text: string, onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.infoCard} className="mx-1 justify-center items-center">
      {icon}
      <Text style={styles.infoText}>{text}</Text>
    </TouchableOpacity>
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
  const [dest, setDest] = useState<DestinationType>({
    "name": "",
    "description": "",
    "location_name": "",
    "latitude": 0,
    "longitude": 0,
    "image_url": "",
    "id": 0,
    "distance": null,
    "average_rating": 0
  });
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const {token, getLoginUser} = useAuth();

  // rating
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleRatingPress = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleRatingSubmit = async () => {
    console.log(`User rating: ${selectedRating}`);
    setModalVisible(false);
    try {
      const res = await fetch(process.env.EXPO_PUBLIC_API_URL + '/places/' + id + '/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: selectedRating,
          message: 'Bagus',
        }),
      });

      if (res.ok) {
        setRefresh(!refresh);
        setShowModal(true);
      } else {
        const data = await res.json();
        console.log('error', data);
        alert("error");
      }
    } catch (err) {
      console.log(err);
      alert("terjadi Error");
    }
  };

  const openGoogleMaps = () => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${dest.latitude},${dest.longitude}`;
    const label = dest.name; // Use the destination name as a label
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) {
      Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open maps.");
    }
  };

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/places/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch destination data');
        }
        const data = await response.json();
        setDest(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch destination data. Please try again.');
      }
      setIsLoading(false);
    };

    const fetchBookmarkData = async () => {
      try {
        const data = await getLoginUser();
        if (!data) {

        } else {
          const mapData = data.saved_places.map((place: any) => place.id);
          setIsBookmarked(mapData.includes(id));
        }
      } catch (err) {
        Alert.alert("error", "Tidak dapat mengakses data");
      }
    };
    fetchDetailData();
    fetchBookmarkData();
  }, [refresh]);

  const handleBookmarkToggle = async () => {
    try {
      const newBookmarkState = !isBookmarked;
      setIsBookmarked(newBookmarkState);

      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/users/save/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Failed to update bookmark');
      }

      Alert.alert('Success', `Bookmark ${newBookmarkState ? 'added' : 'removed'} successfully!`);
    } catch (error) {
      setIsBookmarked((prev) => !prev);
      console.log(error);
      alert('Failed to update bookmark. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ position: 'relative' }}>
        {dest.image_url && <Image source={{ uri: dest.image_url }} style={{ width: '100%', height: 250 }} />}
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
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, maxWidth: '90%' }}>{dest.name}</Text>
          <BookmarkIcon isBookmarked={isBookmarked} onPress={() => handleBookmarkToggle()} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <View className="flex-1 flex-row items-center gap">
            <InfoCard
              icon={<MaterialIcons name="location-on" size={20} color="#008080" />}
              text={dest?.distance ? dest.distance.toString() : '-'}
              onPress={openGoogleMaps}
            />
            <InfoCard
              icon={<AntDesign name="star" size={20} color="#FFD700" />}
              text={dest?.average_rating ? dest.average_rating.toFixed(1).toString() : '0'}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>

        <Text style={{ fontSize: 14, color: '#666', marginBottom: 16, lineHeight: 20 }}>
          {dest.description}
        </Text>
      </View>

      <NotificationModal type={"success"} message="Berhasil memberikan rating" visible={showModal} onClose={() => setShowModal(false)} />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={24} color="#666" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Rate this Destination</Text>

            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRatingPress(star)}>
                  <AntDesign
                    name="star"
                    size={30}
                    color={star <= selectedRating ? "#FFD700" : "#CCCCCC"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleRatingSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default DetailPage;
