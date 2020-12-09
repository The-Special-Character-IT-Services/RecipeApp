import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import HeartOutline from '../../assets/icons/heart-outline.svg';
import HeartSharp from '../../assets/icons/heart-sharp.svg';

const LikeButton = () => {
  const { colors } = useTheme();
  const [iconSelected, setIconSelected] = useState(false);
  return (
    <Pressable style={{ marginRight: 20 }} onPress={() => setIconSelected(!iconSelected)}>
      {iconSelected ? (
        <HeartSharp height={24} width={24} fill={colors.primary} />
      ) : (
        <HeartOutline height={24} width={24} stroke={colors.text} />
      )}
    </Pressable>
  );
};

export default LikeButton;
