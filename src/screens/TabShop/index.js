/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import { ScrollView } from 'react-native-gesture-handler';
// import ShopProduct from '../../components/ShopProduct';
import LottieView from 'lottie-react-native';
// import Advertisement from '../../components/Advertisement';
import { View } from 'react-native';
import TextEle from '@components/TextEle';

const TabShop = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <LottieView
      source={require('@assets/lottie/45728-cooking-news-animation.json')}
      style={{ height: 300, width: 300 }}
      autoPlay
      loop={false}
    />
    <TextEle variant="header1">Coming Soon</TextEle>
  </View>
);
export default TabShop;
