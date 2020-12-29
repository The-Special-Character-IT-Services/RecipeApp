import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import TextEle from '../TextEle';

const ListItem = ({ item, cardWidth }) => (
  <View
    key={item.id}
    style={{
      paddingLeft: 5,
      marginVertical: 5,
      marginHorizontal: 5,
      alignItems: 'center',
    }}>
    <ImageBackground
      style={{
        borderRadius: 10,
        height: 200,
        width: cardWidth - 10,
      }}
      imageStyle={{ borderRadius: 20 }}
      source={item.img1}>
      <TextEle style={{ color: 'white', marginHorizontal: 10, marginVertical: 5 }} variant="title1">
        {item.text}
      </TextEle>
    </ImageBackground>
  </View>
);

ListItem.propTypes = {
  item: PropTypes.shape({
    img1: PropTypes.number,
    id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  cardWidth: PropTypes.number.isRequired,
};
export default ListItem;
