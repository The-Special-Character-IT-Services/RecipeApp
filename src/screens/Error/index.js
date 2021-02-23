import React from 'react';
import { View } from 'react-native';
import TextEle from '@components/TextEle';
import LottieView from 'lottie-react-native';
// import { useTheme } from '@react-navigation/native';

const Error = () => {
  // const { colors } = useTheme();
  // const { width, height } = useWindowDimensions();

  const errMsg = `Sorry ! Something went wrong. 
Check your internet connection.`;

  return (
    <View style={{ backgroundColor: '#FBFBFB', flex: 1, alignItems: 'center' }}>
      <LottieView
        source={require('@assets/lottie/ezgif.com-gif-maker.mp4.lottie.json')}
        autoPlay
        loop
      />
      <View style={{ position: 'absolute', bottom: 100 }}>
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
