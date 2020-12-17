/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import ShopProduct from '../../components/ShopProduct';
import TextEle from '../../components/TextEle';

const TabShop = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <TextEle
        variant="header1"
        style={{
          paddingVertical: 10,
          backgroundColor: colors.background,
          color: colors.primary,
        }}>
        Order Now
      </TextEle>
      <ShopProduct />
    </View>
  );
};

export default TabShop;
