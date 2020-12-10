import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TextEle from '../TextEle';
import data from './data';
import ListItem from './ListItem';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 2;

const Popular = ({ onRecipePress }) => {
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
        <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
          <TextEle variant="title1" style={{ fontSize: 20, fontWeight: 'bold' }}>
            Popular
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
              <ListItem item={item} onRecipePress={onRecipePress} cardWidth={CARD_WIDTH} />
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

Popular.propTypes = {
  onRecipePress: PropTypes.func.isRequired,
};

export default Popular;
