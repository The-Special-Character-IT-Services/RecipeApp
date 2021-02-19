import React from 'react';
import { View } from 'react-native';
import ErrorImg from '@assets/icons/3.0.svg';
import TextEle from '@components/TextEle';
import { useTheme } from '@react-navigation/native';

const Error = () => {
  const { colors } = useTheme();
  const errMsg = `Sorry ! Something went wrong. 
Please wait your plate will be filled
up soon.`;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ErrorImg />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
          bottom: 240,
        }}>
        <TextEle variant="error" style={{ color: '#ff7f00', textAlign: 'center' }}>
          OOPS!!
        </TextEle>
        <TextEle variant="error1" style={{ color: '#ff7f00', textAlign: 'center' }}>
          {errMsg}
        </TextEle>
      </View>
    </View>
  );
};

export default Error;
