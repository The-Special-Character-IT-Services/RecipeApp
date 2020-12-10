import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import HeartSharp from '../../assets/icons/heart-sharp.svg';

const LikeButton = () => {
  const { colors } = useTheme();
  const [iconSelected, setIconSelected] = useState(false);
  return (
    <Pressable style={{ marginRight: 20 }} onPress={() => setIconSelected(!iconSelected)}>
      <HeartSharp height={24} width={24} fill={iconSelected ? colors.primary : colors.background} />
    </Pressable>
  );
};

export default LikeButton;
