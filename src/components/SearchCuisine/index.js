/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Dimensions, Platform } from 'react-native';
import TextEle from '../TextEle';
import data from './data';
import ListItem from './ListItem';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 2;

const SearchCuisine = () => {
  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current.scrollToOffset({
      animated: false,
      offset: -cardInset,
    });
  }, []);

  return (
    <>
      <View>
        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <TextEle variant="body2" style={{ fontWeight: 'bold', paddingLeft: 10 }}>
            Search by Cuisine
          </TextEle>
        </View>
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
              <ListItem item={item} cardWidth={CARD_WIDTH} />
            </View>
          )}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews
        />
      </View>
    </>
  );
};

export default SearchCuisine;
