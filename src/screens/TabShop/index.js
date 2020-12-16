/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';

import ShopProduct from '../../components/ShopProduct';
import TextEle from '../../components/TextEle';

const TabShop = () => (
  <View style={{ flex: 1 }}>
    <TextEle variant="header1" style={{ paddingVertical: 10, backgroundColor: 'rgb(200,94,0)' }}>
      Order Now
    </TextEle>
    <ShopProduct />
  </View>
);

export default TabShop;
