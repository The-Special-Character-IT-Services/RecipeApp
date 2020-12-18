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
    <ScrollView style={{ flex: 1 }}>
      {Data1.map(item => (
        <View style={{ flexDirection: 'row', flex: 1, margin: 10 }}>
          <Image source={item.image} style={{ height: 100, width: 100, borderRadius: 20 }} />
          <View style={{ flexDirection: 'column', flex: 1 }}>
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
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TextEle style={{ flex: 1, marginLeft: 10 }}>Text</TextEle>
              <AddToCart />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ShopProduct;
