import React from 'react';
import { View } from 'react-native';
import ErrorImg from '@assets/icons/3.0.svg';
import TextEle from '@components/TextEle';
import { useTheme } from '@react-navigation/native';

const Error = () => {
  const { colors } = useTheme();

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
          position: 'absolute',
          bottom: 80,
          left: 20,
          backgroundColor: colors.card,
        }}>
        <TextEle variant="subTitle2" style={{ color: colors.notification }}>
          Error Occurred! Check your internet connection. Will fill your plate soon!
        </TextEle>
      </View>
    </View>
  );
};

export default Error;
