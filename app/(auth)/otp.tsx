import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

const Otp = () => {
  
  const {email}: any = useLocalSearchParams();
  const router = useRouter();
  const {verifikasiOtp, sendOtp} = useAuth();
  const inputRefs = useRef<any>([])
  const [valueOtp, setValueOtp] = useState(["", "", "", "", "", ""])
  
  const handleBackspace = (event : NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    const {nativeEvent} = event
    if (nativeEvent.key === "Backspace") {
      handleOtpChange("", index)
    }
  }
  
  const onChangeOtp = (value: string, index: number) => {
    const newOtp = [...valueOtp]
    newOtp[index] = value
    setValueOtp(newOtp)
  }

  const handleOtpChange = (value : string, index: any) => {

    onChangeOtp(value, index);

    if(value.length !== 0){

      return inputRefs?.current[index + 1]?.focus()
    } 

    return inputRefs?.current[index - 1]?.focus()
  };

 

  const handleContinue = async () => {
    // Tambahkan logika untuk memverifikasi OTP di sini
    const otpValue = valueOtp.join("");
    console.log("OTP yang dimasukkan:", valueOtp.join(""));
    console.log("email ", email)

    try{
      await verifikasiOtp(otpValue, email);
    }catch(err){
      console.log(err)
      alert('Gagal memverifikasi OTP')
    }
    
  };

  return (
    <View className="flex-1 bg-white px-4 justify-center items-center">
      <Text className="text-teal-600 text-2xl font-bold mb-12">Verifikasi Email</Text>
      <Text className="text-gray-700 text-center mb-8">Masukkan kode verifikasi yang dikirimkan ke email {email}</Text>


      <View className="flex-row space-x-2 mb-6">
        {[...new Array(6)].map((_, index) => (
          <TextInput
            key={index}
            autoComplete='one-time-code'
            className="w-12 h-12 border-b-2 border-gray-300 text-center text-lg"
            maxLength={1}
            keyboardType="number-pad"
            ref={(ref) => {
              if(ref && !inputRefs.current.includes(ref)){
                inputRefs.current = [...inputRefs.current, ref]

              }
            }}
            selectTextOnFocus
            contextMenuHidden
            // value={otp[index]}
            editable={true}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={(event) => handleBackspace(event, index)}
          />
        ))}
      </View>

      <TouchableOpacity onPress={() => sendOtp(email)}>
        <Text className="text-teal-600 text-sm mb-10">Kirim Ulang</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-teal-600 py-3 px-6 rounded-lg shadow-lg"
        onPress={handleContinue}
      >
        <Text className="text-white text-base font-semibold">Lanjutkan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;
