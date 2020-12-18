/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ShopProduct from '../../components/ShopProduct';
import Advertisement from '../../components/Advertisement';

const TabShop = () => (
  <ScrollView style={{}}>
    <Advertisement />
    <ScrollView>
      <ShopProduct />
    </ScrollView>
  </ScrollView>
);
export default TabShop;
