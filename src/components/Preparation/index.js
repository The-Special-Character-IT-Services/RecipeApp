/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Timer from '../../assets/icons/timer.svg';
import TextEle from '../TextEle';
import data from './data';
import ListItem from './ListItem';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.4;

const Preparation = ({ preparation }) => {
  const { colors } = useTheme();
  const flatListRef = useRef(null);
  console.log(preparation);
  useEffect(() => {
    flatListRef.current.scrollToOffset({
      animated: false,
      offset: -cardInset,
    });
  }, []);
  return (
    <>
      <View
        style={{
          marginVertical: 10,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextEle variant="subTitle1" style={{ paddingHorizontal: 30, marginVertical: 10 }}>
            Preparation
          </TextEle>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1 }}>
            <Timer height={24} width={24} fill={colors.text} />
            <TextEle style={{ alignItems: 'center', paddingRight: 20 }}> 35` </TextEle>
          </View>
        </View>
        <View>
          <FlatList
            ref={flatListRef}
            data={preparation}
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
            showsVerticalScrollIndicatorr={false}
            renderItem={({ item }) => (
              <View style={{ width: CARD_WIDTH }}>
                <ListItem item={item} cardWidth={CARD_WIDTH} />
              </View>
            )}
            removeClippedSubviews
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </View>
    </>
  );
};

export default Preparation;
