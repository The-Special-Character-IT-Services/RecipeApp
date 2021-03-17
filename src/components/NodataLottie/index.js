import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import TextEle from '@components/TextEle';

const NodataLottie = () => {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: 'center' }}>
      <LottieView
        source={require('@assets/lottie/9923-box-empty.json')}
        style={{ height: 600, width: 600 }}
        autoPlay
        loop
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
          bottom: 150,
        }}>
        <TextEle variant="error" style={{ color: colors.primary, textAlign: 'center' }}>
          Sorry!!
        </TextEle>
        <TextEle variant="error1" style={{ color: colors.primary, textAlign: 'center' }}>
          No data available
        </TextEle>
      </View>
    </View>
  );
};

export default NodataLottie;
