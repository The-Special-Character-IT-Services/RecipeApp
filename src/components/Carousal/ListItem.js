/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Pressable, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Rating from '@components/Rating';
import TextEle from '../TextEle';
import LikeButton from '../LikeButton';

const ListItem = ({ onRecipePress, item, cardWidth }) => {
  const rating = useMemo(() => item.rattings.reduce((p, c, i, a) => p + c.ratting / a.length, 0), [
    item.rattings,
  ]);

  return (
    <Pressable onPress={() => onRecipePress(item)} key={item.id} style={{ width: cardWidth - 10 }}>
      <ImageBackground
        style={{ height: 225, width: cardWidth - 10 }}
        imageStyle={{ borderRadius: 20 }}
        source={{ uri: item?.recipeImage?.url }}>
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
          {/* {item.id === 3 || item.id === 2 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.7,
                marginVertical: 20,
              }}>
              <Lock height={100} width={100} fill="black" />
            </View>
          ) : (
            <></>
          )} */}
        </View>
      </ImageBackground>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <TextEle variant="h3">{item.name}</TextEle>
          <TextEle
            variant="h2"
            style={{ flexWrap: 'wrap', color: 'gray', fontSize: 12 }}
            numberOfLines={2}>
            {item.caption}
          </TextEle>
        </View>
        <View>
          <TextEle style={{ padding: 10 }} variant="h3">{`${item.recipes.length} Recipes`}</TextEle>
        </View>
      </View>
      <Rating rating={rating} length={5} totalRating={item.rattings.length} />
      <TextEle variant="p1">
        {new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(item.price)}
      </TextEle>
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
