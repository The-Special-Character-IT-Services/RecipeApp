/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef } from 'react';
// import { ScrollView } from 'react-native-gesture-handler';
// import ShopProduct from '../../components/ShopProduct';
import LottieView from 'lottie-react-native';
// import Advertisement from '../../components/Advertisement';
import { View } from 'react-native';
import TextEle from '@components/TextEle';
import { useFocusEffect } from '@react-navigation/native';

const TabShop = () => {
  const animation = useRef(null);
  useFocusEffect(
    useCallback(() => {
      animation.current.play();
      // Do something when the screen is focused
      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        ref={animation}
        source={require('@assets/lottie/45728-cooking-news-animation.json')}
        style={{ height: 300, width: 300 }}
        autoPlay={false}
        loop={false}
      />
      <TextEle variant="header1">Coming Soon</TextEle>
    </View>
  );
};
export default TabShop;
