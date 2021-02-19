import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import TextEle from '@components/TextEle';

const SavedVideos = () => {
  const { colors } = useTheme();
  const animation = useRef(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        ref={animation}
        source={require('@assets/lottie/45728-cooking-news-animation.json')}
        style={{ height: 300, width: 300 }}
        autoPlay
        loop={false}
      />
      <TextEle variant="header1">Coming Soon</TextEle>
      <View style={{ height: 2, width: 100, backgroundColor: colors.text, marginVertical: 10 }} />
    </View>
  );
};

export default SavedVideos;
