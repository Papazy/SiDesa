import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const contactData = [
  {
    title: 'Kapal Bot Pulo Aceh',
    phone: '+62 819-5967-4533',
    icon: 'directions-boat',
  },
  {
    title: 'Tourget',
    phone: '',
    icon: 'tour',
  },
  {
    title: 'Penginapan',
    phone: '+62 813-6002-9007',
    icon: 'hotel',
  },
  {
    title: 'Keuchik Gugop',
    phone: '+62 812-4160-3270',
    icon: 'account-circle',
  },
  {
    title: 'Polsek',
    phone: '+62 821-1077-6464',
    icon: 'local-police',
  },
  {
    title: 'Puskesmas',
    phone: '',
    icon: 'local-hospital',
  },
];

const ContactPage = () => {
  const router = useRouter();

  const handleCall = (phone: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

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

        <Text className="text-lg font-bold text-teal-600 mt-4">Kontak Penting</Text>

        {/* Contact List */}
        <View className="mt-6 space-y-4">
          {contactData.map((contact, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center bg-gray-100 p-4 rounded-lg shadow-sm ${
                contact.phone ? 'opacity-100' : 'opacity-50'
              }`}
              onPress={() => contact.phone && handleCall(contact.phone)}
              disabled={!contact.phone}
            >
              {/* Icon */}
              <View className="mr-4">
                <MaterialIcons
                  name={contact.icon as any}
                  size={28}
                  color={contact.phone ? '#008080' : '#999'}
                />
              </View>

              {/* Contact Info */}
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">{contact.title}</Text>
                <Text className="text-gray-700 mt-1">
                  {contact.phone || 'Tidak tersedia'}
                </Text>
              </View>

              {/* Phone Action Icon */}
              <MaterialIcons
                name="phone"
                size={20}
                color={contact.phone ? '#008080' : '#ccc'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactPage;
