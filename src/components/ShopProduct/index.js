/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import StarIcon from '../../assets/icons/star-icon.svg';
import AddToCart from '../AddToCart';

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
            <View style={{ flexDirection: 'column' }}>
              <TextEle
                variant="subTitle2"
                style={{
                  color: colors.text,
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}>
                {item.text}
              </TextEle>
              <View style={{ flexDirection: 'row' }}>
                <TextEle
                  variant="caption"
                  style={{
                    color: colors.text,
                    marginHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  {item.cal}
                </TextEle>
                <View style={{ height: 25, width: 1, backgroundColor: 'gray' }} />
                <TextEle
                  variant="caption"
                  style={{
                    color: colors.text,
                    marginHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  {item.Rate}
                </TextEle>
                <StarIcon height={20} width={20} fill={colors.text} top={4} left={-7} />
                <AddToCart />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShopProduct;
