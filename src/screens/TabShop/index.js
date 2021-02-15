/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ShopProduct from '../../components/ShopProduct';
import Advertisement from '../../components/Advertisement';

const TabShop = () => (
  <View>
    <ScrollView style={{}}>
      <Advertisement />
      <ScrollView>
        <ShopProduct />
      </ScrollView>
      <LottieView
        style={{ height: 50, width: 50 }}
        source={require('@assets/lottie/comingSoon.json')}
      />
    </ScrollView>
  </View>
);
export default TabShop;
