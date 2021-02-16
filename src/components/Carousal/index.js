import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Platform, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TextEle from '@components/TextEle';
import Loading from '@components/loading';
import { useTheme } from '@react-navigation/native';
import ListItem from './ListItem';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const Carousal = ({ onRecipePress, onPressViewAll, data = [] }) => {
  const { colors } = useTheme();
  if (!data) {
    return <Loading />;
  }
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
          <ListItem item={item} onRecipePress={() => onRecipePress(item)} cardWidth={CARD_WIDTH} />
        </View>
      )}
      ListFooterComponent={() => (
        <Pressable
          onPress={onPressViewAll}
          style={{
            width: CARD_WIDTH,
            height: 225,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: 20,
          }}>
          <TextEle style={{ color: colors.primary }}>View All</TextEle>
        </Pressable>
      )}
      removeClippedSubviews
      keyExtractor={item => `${item.id}`}
    />
  );
};

Carousal.propTypes = {
  onRecipePress: PropTypes.func.isRequired,
};

export default Carousal;
