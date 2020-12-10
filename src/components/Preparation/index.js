/* eslint-disable import/no-unresolved */
import React from 'react';
import { View, ImageBackground, Pressable } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import Timer from '../../assets/icons/timer.svg';
import Play from '../../assets/icons/play.svg';
import TextEle from '../TextEle';
import data0 from './data';

const Preparation = () => {
  const { colors } = useTheme();
  return (
    <View>
      <View style={{ marginHorizontal: 30, marginTop: 20 }}>
        <TextEle variant="header2">Maxican Salad</TextEle>
        <TextEle variant="caption" numberOfLines={2} style={{ color: 'gray' }}>
          Get ready for a healthy and tasty tour of Maxican Salad
        </TextEle>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextEle variant="subTitle1" style={{ paddingHorizontal: 30, marginVertical: 10 }}>
            Preparation
          </TextEle>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1 }}>
            <Timer height={24} width={24} fill={colors.text} />
            <TextEle style={{ alignItems: 'center', paddingRight: 20 }}> 35` </TextEle>
          </View>
        </View>
        <BottomSheetScrollView
          style={{ marginBottom: 10 }}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 27 }}
          showsHorizontalScrollIndicator={false}>
          {data0.map(item => (
            <View
              style={{ flexDirection: 'row', paddingHorizontal: 5, paddingTop: 10 }}
              key={item.id}>
              <ImageBackground
                imageStyle={{ borderRadius: 15 }}
                source={item.img}
                style={{
                  height: 230,
                  width: 150,
                  borderRadius: 500,
                }}>
                <TextEle
                  variant="caption"
                  style={{ color: 'white', paddingLeft: 10, paddingTop: 5 }}>
                  {item.text}
                </TextEle>
              </ImageBackground>
            </View>
          ))}
        </BottomSheetScrollView>
        <Pressable
          // eslint-disable-next-line no-alert
          onPress={() => alert('hi')}
          style={{
            marginHorizontal: 40,
            marginVertical: 50,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#FD6D3B',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Play height={24} width={24} fill={colors.background} />
          <TextEle style={{ color: 'white' }}>Watch Video</TextEle>
        </Pressable>
      </View>
    </View>
  );
};

export default Preparation;
