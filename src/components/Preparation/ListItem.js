import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import TextEle from '../TextEle';

const ListItem = ({ item, cardWidth }) => {
  const { colors } = useTheme();
  return (
    <View key={item.id} style={{ width: cardWidth }}>
      <View style={{ marginHorizontal: 5 }}>
        <Image
          source={{ uri: item?.image?.url }}
          style={{
            height: 230,
            width: 330,
            borderRadius: 20,
          }}
        />
        <TextEle variant="caption" style={{ color: colors.text, marginTop: 20 }}>
          {item?.description}
        </TextEle>
      </View>
    </View>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  cardWidth: PropTypes.number.isRequired,
};

export default ListItem;
