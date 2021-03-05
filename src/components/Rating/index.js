import TextEle from '@components/TextEle';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Rating = ({ rating, length, onPress }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[...Array(length)].map((_, i) => (
        <Pressable style={{ paddingHorizontal: 5 }} key={i} onPress={() => onPress(i + 1)}>
          {i + 1 <= rating ? (
            <Icon name="star" size={24} color={colors.primary} />
          ) : i < rating ? (
            <Icon name="star-half" size={24} color={colors.primary} />
          ) : (
            <Icon name="star-outline" size={24} color={colors.primary} />
          )}
        </Pressable>
      ))}
      <TextEle style={{ color: colors.primary }}>{`${rating} `}</TextEle>
    </View>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  length: PropTypes.number.isRequired,
};

export default Rating;
