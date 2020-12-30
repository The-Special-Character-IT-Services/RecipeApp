/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import data from '../EventRecipe/data';
import EventDetails from './EventDetails';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const UpComingEvent = ({ onRecipePress }) => {
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
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ width: CARD_WIDTH }}>
          <EventDetails item={item} onRecipePress={onRecipePress} cardWidth={CARD_WIDTH} />
        </View>
      )}
      removeClippedSubviews
      keyExtractor={item => `${item.id}`}
    />
  );
};

UpComingEvent.propTypes = {
  onRecipePress: PropTypes.func.isRequired,
};

export default UpComingEvent;
