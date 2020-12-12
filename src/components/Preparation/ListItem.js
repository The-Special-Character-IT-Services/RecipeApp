import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import TextEle from '../TextEle';

const ListItem = ({ item, cardWidth }) => (
  <View key={item.id} style={{ width: cardWidth }}>
    <View style={{ paddingHorizontal: 5, paddingTop: 10 }}>
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
  </View>
);

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  cardWidth: PropTypes.number.isRequired,
};

export default ListItem;
