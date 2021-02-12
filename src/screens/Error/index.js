import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import ErrorImg from '@assets/images/2.0-black-bg.jpg';

const Error = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
    <ImageBackground
      source={ErrorImg}
      style={{ height: 500, width: 400 }}
      imageStyle={{ position: 'absolute' }}>
      <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 25 }}>Error Occurred!</Text>
    </ImageBackground>
  </View>
);

export default Error;
