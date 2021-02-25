import TextEle from '@components/TextEle';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const Rating = ({ rating, length, totalRating, onPress }) => {
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

export default Rating;
