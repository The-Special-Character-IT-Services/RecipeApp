/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { RectButton, FlatList } from 'react-native-gesture-handler';
import Timer from '../../assets/icons/timer.svg';
import Play from '../../assets/icons/play.svg';
import TextEle from '../TextEle';
import data from './data';
import ListItem from './ListItem';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.4;

const Preparation = ({ onWatchVideoPress }) => {
  const { colors } = useTheme();
  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current.scrollToOffset({
      animated: false,
      offset: -cardInset,
    });
  }, []);
  return (
    <>
      <View style={{ marginHorizontal: 30, marginTop: 20 }}>
        <TextEle variant="header2">Maxican Salad</TextEle>
        <TextEle variant="caption" numberOfLines={2} style={{ color: 'gray' }}>
          Get ready for a healthy and tasty tour of Maxican Salad
        </TextEle>
      </View>
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
          removeClippedSubviews
        />
        {/* <ScrollView
          style={{ marginBottom: 10 }}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 27 }}
          showsHorizontalScrollIndicator={false}>
          {data0.map(item => (
            <View style={{ paddingHorizontal: 5, paddingTop: 10 }} key={item.id}>
              <Image
                imageStyle={{ borderRadius: 15 }}
                source={item.img}
                style={{
                  height: 230,
                  width: 330,
                  borderRadius: 50,
                }}
              />
              <TextEle variant="caption" style={{ color: 'white', marginTop: 20 }}>
                {item.text}
              </TextEle>
            </View>
          ))}
        </ScrollView> */}
        <RectButton
          onPress={onWatchVideoPress}
          style={{
            marginHorizontal: 40,
            marginVertical: 50,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#FD6D3B',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Play height={24} width={24} fill="white" />
          <TextEle style={{ color: 'white', paddingLeft: 10 }}>Watch Video</TextEle>
        </RectButton>
      </View>
    </>
  );
};
Preparation.propTypes = {
  onWatchVideoPress: PropTypes.func.isRequired,
};
export default Preparation;
