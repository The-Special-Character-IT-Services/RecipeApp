import TextEle from '@components/TextEle';
import React from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const Rating = ({ rating, length, totalRating }) => (
  <View style={{ flexDirection: 'row' }}>
    <AirbnbRating defaultRating={rating} />
    <TextEle variant="p2" style={{ paddingHorizontal: 5 }}>
      {rating}
    </TextEle>
    <TextEle variant="p2">{`(${totalRating})`}</TextEle>
  </View>
);

export default Rating;
