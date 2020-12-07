/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import CakeIcon from '../../assets/icons/cake-black.svg';

const index = () => (
  <View>
    <Text>Splash Screen</Text>
    <Image
      style={{ height: 120, width: 120, borderRadius: 10 }}
      source={require('../../assets/images/64dffaa58ffa55a377cdf42b6a690e721585809275.png')}
    />
    <CakeIcon height={24} width={24} fill="red" />
    <ImageBackground
      style={{ height: 120, width: 120, borderRadius: 10 }}
      source={require('../../assets/images/64dffaa58ffa55a377cdf42b6a690e721585809275.png')}>
      <Text style={{ color: 'red' }}>Hello from image</Text>
      <CakeIcon height={24} width={24} fill="red" />
    </ImageBackground>
  </View>
);

export default index;
