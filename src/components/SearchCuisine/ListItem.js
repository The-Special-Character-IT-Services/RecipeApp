import React from 'react';
import { View, Image } from 'react-native';
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
    <Image
      style={{
        borderRadius: 10,
        height: 200,
        width: cardWidth - 10,
      }}
      imageStyle={{ borderRadius: 20 }}
      source={item.img1}
    />
    <TextEle variant="title">{item.text}</TextEle>
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
