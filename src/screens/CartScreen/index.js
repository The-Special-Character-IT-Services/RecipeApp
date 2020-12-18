import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import TextEle from '../../components/TextEle';

const CartScreen = () => {
  const { colors } = useTheme();
  return (
    <View>
      <TextEle style={{ color: colors.text }}>Cart Screen</TextEle>
    </View>
  );
};

export default CartScreen;
