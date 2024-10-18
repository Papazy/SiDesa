import React, { useState } from 'react';
import { Button, ImageBackground, Text, View } from 'react-native';
import bg from '../../assets/images/on-board-1.png'
import bg2 from '../../assets/images/on-board-2.png'
import bg3 from '../../assets/images/on-board-3.png'
import { Redirect, useRouter } from 'expo-router';

interface DotProps {
  isFull : boolean
}

const Dot : React.FC<DotProps> = ({isFull = false}) => {
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: isFull ? '#fff' : '#999896',
      }}
    />
  );
}

interface ButtonWrapperProps {
  onPress : () => void
  index: number
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({onPress, index}) => {
  return (
    <View
      style={{
        position:'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 20,
      }}
    >
        <View className="w-full  px-10">
          <Button title="Lanjut" color="#008080" onPress={onPress} />
        </View>
      <View className='flex-1 items-center flex-row '>
      <Dot isFull={index === 1? true: false} />
      <Dot isFull={index === 2? true: false} />
      <Dot isFull={index === 3? true: false} />
      </View>
    </View>
  );
}

const ButtonWrapperFinish: React.FC<ButtonWrapperProps> = ({onPress, index}) => {
  return (
    <View
      style={{
        position:'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 20,
      }}
    >
        <View className="w-full  px-10">
          <Button title="Mulai" color="#008080" onPress={onPress} />
        </View>
      <View className='flex-1 items-center flex-row '>
      <Dot isFull={index === 1? true: false} />
      <Dot isFull={index === 2? true: false} />
      <Dot isFull={index === 3? true: false} />
      </View>
    </View>
  );
}

const Page1 = () => {
  return(
    <View className='flex-1 justify-center items-center text-white w-full'>


    <ImageBackground
      source={bg} 
      resizeMode='cover'
      className="flex-1 justify-center min-h-full w-full"
    >
      <View className="bg-opacity-30 flex-1 justify-center px-6 pb-32">
        <View className="mb-4 mt-auto pr-8">
        <Text className="text-white text-3xl font-bold mb-2">
          Welcome to Pulo Aceh
        </Text>
        <Text className="text-white text-3xl font-bold mb-2">
          "Where the wonderful Indonesia starts from"
        </Text>
        </View>
      </View>
    </ImageBackground>
  </View>

  )
}


const Page2 = () => {
  return(
    <View className='flex-1 justify-center items-center text-white w-full'>
    <ImageBackground
      source={bg2} 
      resizeMode='cover'
      className="flex-1 justify-center min-h-full w-full"
    >
      <View className="bg-opacity-30 flex-1 justify-center px-6 pb-32">
        <View className="mb-4 mt-auto pr-8">
        <Text className="text-white text-3xl font-bold mb-6">
          Temukan Tujuan Wisata
        </Text>
        
        </View>
      </View>
    </ImageBackground>
  </View>
  )
}

const Page3 = () => {
  return(
    <View className='flex-1 justify-center items-center text-white w-full'>
    <ImageBackground
      source={bg3} 
      resizeMode='cover'
      className="min-h-full w-full"
    >
      <View className="bg-opacity-30 justify-center px-6 pt-20 ">
        <View className="mb-4 mt-auto pr-8">
        <Text className="text-[#255665] text-3xl font-bold mb-2">
         Dapatkan informasi wisata dengan mudah
        </Text>
   
        </View>
      </View>
    </ImageBackground>
  </View>
  )
}

export default function Index() {
  const [idx, setIdx] = useState(1);
  const onPressButtonHandle = () => {
    setIdx(idx + 1);
  };

  const router = useRouter();
  const onPressButtonFinishHandle = () => {
    router.replace('/login');
  };
  return (
    <>
    {idx === 1 && <Page1 />}
    {idx === 2 && <Page2 />}
    {idx === 3 && <Page3 />}

     {(idx < 3) && <ButtonWrapper onPress={onPressButtonHandle} index={idx} />}
     {(idx === 3) && <ButtonWrapperFinish onPress={onPressButtonFinishHandle} index={idx} />}
    </>
  );
}