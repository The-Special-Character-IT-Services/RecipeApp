/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Timer from '../../assets/icons/timer.svg';
import TextEle from '../TextEle';

import ListItem from './ListItem';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const Preparation = ({ preparation }) => {
  const { colors } = useTheme();
  const flatListRef = useRef(null);
  console.log(preparation);

  return (
    <>
      <View
        style={{
          marginVertical: 10,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextEle variant="subTitle1" style={{ margin: 20 }}>
            Preparation
          </TextEle>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1 }}>
            <Timer height={24} width={24} fill={colors.text} />
            <TextEle style={{ alignItems: 'center', paddingRight: 20 }}> 35` </TextEle>
          </View>
        </View>
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          data={preparation}
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
    </>
  );
};

Preparation.propTypes = {
  preparation: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Preparation;
