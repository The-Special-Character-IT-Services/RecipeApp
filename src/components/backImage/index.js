import React from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import HeartIcon from '../../assets/icons/heart-icon.svg';
import LeftArrow from '../../assets/icons/left-arrow.svg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const index = () => (
  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
    <ImageBackground
      style={{
        height: windowHeight * 0.5,
        width: windowWidth,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      source={require('../../assets/images/black.png')}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        <LeftArrow height={24} width={24} fill="white" />
        <HeartIcon height={24} width={24} fill="white" />
      </View>
    </ImageBackground>
    <View
      style={{
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,

        height: windowHeight * 0.7,
        backgroundColor: '#FFF',
        zIndex: 1,
      }}
    />
  </View>
);

export default index;
