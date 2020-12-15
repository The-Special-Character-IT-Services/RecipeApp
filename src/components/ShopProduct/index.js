/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { Dimensions, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import data from './data';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const Popular = () => {
  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current.scrollToOffset({
      animated: false,
      offset: -cardInset,
    });
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      horizontal
      pagingEnabled
      snapToAlignment="center"
      decelerationRate="fast"
      scrollEventThrottle={16}
      snapToInterval={CARD_WIDTH}
      renderToHardwareTextureAndroid
      contentInset={{
        top: 0,
        left: cardInset,
        bottom: 0,
        right: cardInset,
      }}
      contentContainerStyle={[
        {
          paddingHorizontal: Platform.OS === 'android' ? cardInset : 0,
        },
      ]}
    />
  );
};

export default Popular;
