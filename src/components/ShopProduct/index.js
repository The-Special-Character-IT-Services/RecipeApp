/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import Data1 from './data';

import TextEle from '../TextEle';

const ShopProduct = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView verticle showsVerticleScrollIndicator={false}>
        {Data1.map(item => (
          <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 5 }}>
            <View>
              <Image source={item.image} style={{ height: 100, width: 100, borderRadius: 10 }} />
            </View>
            <View>
              <TextEle
                variant="subTitle1"
                style={{
                  color: colors.text,
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}>
                {item.text}
              </TextEle>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShopProduct;
