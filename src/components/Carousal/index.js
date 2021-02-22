import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const Carousal = ({ renderItem, ListFooterComponent, ...rest }) => {
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
      removeClippedSubviews
      renderItem={({ item }) => (
        <View style={{ width: CARD_WIDTH }}>{renderItem(item, CARD_WIDTH)}</View>
      )}
      ListFooterComponent={() => ListFooterComponent(CARD_WIDTH)}
      {...rest}
    />
  );
};

Carousal.propTypes = {
  onRecipePress: PropTypes.func.isRequired,
};

export default Carousal;
