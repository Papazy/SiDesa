import React from 'react';
import { View, Text, Modal, ActivityIndicator, GestureResponderEvent } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';


type NotificationModalProps = {
  type: 'success' | 'error' | 'notif';
  message: string;
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
};

type LoadingModalProps = {
  visible: boolean;
};

const NotificationModal: React.FC<NotificationModalProps> = ({ type, message, visible, onClose }) => {
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <AntDesign name="checkcircle" size={24} color="green" />;
      case 'error':
        return <MaterialIcons name="error" size={24} color="red" />;
      case 'notif':
      default:
        return <Ionicons name="information-circle" size={24} color="blue" />;
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/20 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg shadow-lg w-80">
          <View>

            <View className="flex-row items-center space-x-3">
              {renderIcon()}
              <Text className="text-lg font-semibold">{type.toUpperCase()}</Text>
            </View>
            <View className="absolute top-0 right-0">
              <MaterialIcons name="close" size={24} color="gray" onPress={onClose} />
            </View>
          </View>
          <Text className="mt-2 text-gray-700">{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const LoadingModal: React.FC<LoadingModalProps> = ({ visible }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/20 bg-opacity-50">
        <View className="p-4 bg-white rounded-full">
          <ActivityIndicator size="large" color="blue" />
        </View>
      </View>
    </Modal>
  );
};

export { NotificationModal, LoadingModal };
