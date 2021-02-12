import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeButton = () => {
  const { colors } = useTheme();
  const [iconSelected, setIconSelected] = useState(false);

  const setIcon = () => setIconSelected(!iconSelected);

  return (
    <Pressable style={{ marginRight: 10 }} onPress={setIcon}>
      <Icon
        name="heart-sharp"
        size={25}
        color={iconSelected ? colors.primary : colors.background}
      />
    </Pressable>
  );
};

export default LikeButton;
