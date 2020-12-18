/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Data2 from './data';

const ShopProduct = () => (
  <ScrollView horizontal>
    {Data2.map(item => (
      <View style={{ flexDirection: 'row', margin: 10, height: 200 }}>
        <Image source={item.image} style={{ height: 150, width: 300, borderRadius: 20 }} />
      </View>
    ))}
  </ScrollView>
);

export default ShopProduct;
