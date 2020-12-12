import React from 'react';
import PropTypes from 'prop-types';

import { ImageBackground, Pressable, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TimerIcon from '../../assets/icons/Timer-icon.svg';
import StarIcon from '../../assets/icons/star-icon.svg';
import TextEle from '../TextEle';
import LikeButton from '../LikeButton';

const ListItem = ({ item, onRecipePress, cardWidth }) => {
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => onRecipePress(item)} key={item.id} style={{ width: cardWidth }}>
      <ImageBackground
        style={{ height: 225, width: cardWidth - 10 }}
        imageStyle={{ borderRadius: 20 }}
        source={item.img}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <LikeButton />
        </View>
      </ImageBackground>
      <View>
        <TextEle style={{ paddingTop: 20, paddingBottom: 5 }}>{item.TextHeading}</TextEle>
        <TextEle
          style={{ flexWrap: 'wrap', paddingBottom: 10, color: 'gray', fontSize: 12 }}
          numberOfLines={2}>
          {item.Description}
        </TextEle>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TimerIcon height={24} width={24} fill={colors.text} />
          <TextEle style={{ marginLeft: 8 }}>{item.time}</TextEle>
          <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center' }}>
            <StarIcon height={24} width={24} fill={colors.text} />
            <TextEle style={{ marginLeft: 8 }}>{item.rating}</TextEle>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    Description: PropTypes.string,
    img: PropTypes.number,
    TextHeading: PropTypes.string,
    rating: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  onRecipePress: PropTypes.func.isRequired,
  cardWidth: PropTypes.number.isRequired,
};

export default ListItem;
