import React from 'react';
import { ImageBackground, View } from 'react-native';
import ErrorImg from '@assets/images/Error.jpg';

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
      style={{ height: 700, width: 400 }}
      imageStyle={{ position: 'absolute' }}
    />
  </View>
);

export default Error;
