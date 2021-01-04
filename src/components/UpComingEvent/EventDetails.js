/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Pressable, View } from 'react-native';
import TextEle from '../TextEle';
import LikeButton from '../LikeButton';

const EventDetails = ({ item, cardWidth }) => (
  <Pressable key={item.id} style={{ width: cardWidth }}>
    <ImageBackground
      style={{ height: 225, width: cardWidth - 10 }}
      imageStyle={{ borderRadius: 20 }}
      source={item.img}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <LikeButton />
        </View>
      </View>
    </ImageBackground>
    <View>
      <TextEle variant="title1" style={{ paddingTop: 20, paddingBottom: 5 }}>
        {item.text}
      </TextEle>
      <TextEle
        style={{ flexWrap: 'wrap', paddingBottom: 10, color: 'gray', fontSize: 16 }}
        numberOfLines={2}>
        {item.time}
      </TextEle>
    </View>
  </Pressable>
);

EventDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    Description: PropTypes.string,
    img: PropTypes.number,
    text: Pressable.string,
    time: PropTypes.string,
  }).isRequired,
  cardWidth: PropTypes.number.isRequired,
};

export default EventDetails;
