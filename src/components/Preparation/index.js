/* eslint-disable import/no-unresolved */
import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import Timer from '../../assets/icons/timer.svg';
import Play from '../../assets/icons/play.svg';
import TextEle from '../TextEle';
import data0 from './data';

const Preparation = ({ onWatchVideoPress }) => {
  const { colors } = useTheme();
  return (
    <>
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
        <ScrollView
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
        </ScrollView>
        <RectButton
          // eslint-disable-next-line no-alert
          onPress={onWatchVideoPress}
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
          <Play height={24} width={24} fill="white" />
          <TextEle style={{ color: 'white', paddingLeft: 10 }}>Watch Video</TextEle>
        </RectButton>
      </View>
    </>
  );
};
Preparation.propTypes = {
  onWatchVideoPress: PropTypes.func.isRequired,
};
export default Preparation;
