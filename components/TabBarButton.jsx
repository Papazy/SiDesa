import { View, Text, Pressable, StyleSheet, PressableProps } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';



const TabBarButton = (props) => {

  const primaryColor = '#0891b2';
    const greyColor = '#737373';

  const icons = {
    index: (props)=> <AntDesign name="home" size={26} color={greyColor} {...props} />,
    explore: (props)=> <Feather name="compass" size={26} color={greyColor} {...props} />,
    create: (props)=> <AntDesign name="pluscircleo" size={26} color={greyColor} {...props} />,
    profile: (props)=> <AntDesign name="user" size={26} color={greyColor} {...props} />,
    search: (props) => <AntDesign name="search1" size={24} color={color} {...props} />,
    bookmark: (props) => <Ionicons name="bookmark-outline" size={24} color={color} {...props} />,
    maps: (props) => <Ionicons name="map-outline" size={24} color={color} {...props} />,
}
  const { isFocused, label, routeName, color, ...restProps } = props;
  // console.log(routeName);

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <Pressable {...restProps} style={styles.container}>
      <Animated.View style={[animatedIconStyle]}>
        {icons[routeName]({
          color,
        })}
      </Animated.View>

      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default TabBarButton;
