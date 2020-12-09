import React from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import HeartIcon from '../../assets/icons/heart-icon.svg';
import Preparation from '../../components/Preparation';

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
      source={require('../../assets/images/FoodPic1.jpg')}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        <HeartIcon height={24} width={24} fill="white" />
      </View>
    </ImageBackground>
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,

        height: windowHeight * 0.65,
        backgroundColor: '#FFF',
        zIndex: 1,
      }}>
      <Preparation />
    </View>
  </View>
);

export default index;
