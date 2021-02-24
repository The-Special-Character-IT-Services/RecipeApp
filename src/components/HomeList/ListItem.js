/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Rating from '@components/Rating';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@react-navigation/native';
import TextEle from '../TextEle';
import LikeButton from '../LikeButton';

const ListItem = ({ onRecipePress, item, cardWidth }) => {
  const rating = useMemo(() => item.rattings.reduce((p, c, i, a) => p + c.ratting / a.length, 0), [
    item.rattings,
  ]);

  const isPurchased = item.purchase_details.some(
    x => x.course.id === item?.id && x.status === 'purchased',
  );

  const { colors } = useTheme();

  return (
    <Pressable onPress={() => onRecipePress(item)} key={item?.id} style={{ width: cardWidth - 10 }}>
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
            <Rating rating={rating} length={1} totalRating={item?.rattings?.length} />
          </View>
          {!isPurchased && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                height: 40,
                width: 40,
                left: 5,
                top: 3,
                backgroundColor: colors.card,
                borderRadius: 20,
              }}>
              <Icon name="lock-closed" size={24} color={colors.primary} />
            </View>
          )}
          {/* {item.id === 3 || item.id === 2 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 1,
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
            {item?.name}
          </TextEle>
          <TextEle variant="p1">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(item?.price)}
          </TextEle>
        </View>
        <View style={{ marginVertical: 10 }}>
          <LikeButton courseId={item?.id} />
        </View>
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
    purchase_details: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    Description: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    price: PropTypes.number,
    time: PropTypes.string,
    rating: PropTypes.string,
    rattings: PropTypes.arrayOf.isRequired,
  }).isRequired,
  onRecipePress: PropTypes.func.isRequired,
  cardWidth: PropTypes.number.isRequired,
};

export default ListItem;
