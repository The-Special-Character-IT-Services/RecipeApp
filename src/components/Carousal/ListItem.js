/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Pressable, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Rating from '@components/Rating';
import TextEle from '../TextEle';
import LikeButton from '../LikeButton';

const ListItem = ({ onRecipePress, item, cardWidth, userId }) => {
  const rating = useMemo(() => item.rattings.reduce((p, c, i, a) => p + c.ratting / a.length, 0), [
    item.rattings,
  ]);

  const isPurchased = item.purchase_details.some(
    x => x.course.id === item.id && x.status === 'purchased',
  );

  return (
    <Pressable onPress={() => onRecipePress(item)} key={item.id} style={{ width: cardWidth - 10 }}>
      <ImageBackground
        style={{ height: 225, width: cardWidth - 10 }}
        imageStyle={{ borderRadius: 20 }}
        source={{ uri: item?.image?.url }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 5,
              top: 5,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 2,
            }}>
            <Rating rating={rating} length={1} totalRating={item.rattings.length} />
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
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flexDirection: 'column', flex: 1, paddingRight: 20 }}>
          <TextEle style={{ paddingTop: 10 }} numberOfLines={1} variant="h1">
            {item.name}
          </TextEle>
          <TextEle variant="p1">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(item.price)}
          </TextEle>
        </View>
        <LikeButton courseId={item.id} />
      </View>
      {/* <TextEle variant="h3" style={{ flexWrap: 'wrap', color: 'gray' }} numberOfLines={2}>
          {item.caption}
        </TextEle> */}
      {/* <TextEle variant="h3">{`${item.recipes.length} Recipes`}</TextEle> */}
    </Pressable>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    Description: PropTypes.string,
    img: PropTypes.number,
    TextHeading: PropTypes.string,
    time: PropTypes.string,
    rating: PropTypes.string,
    rattings: PropTypes.string,
  }).isRequired,
  onRecipePress: PropTypes.func.isRequired,
  cardWidth: PropTypes.number.isRequired,
};

export default ListItem;
