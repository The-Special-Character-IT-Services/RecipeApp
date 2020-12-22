import { useTheme } from '@react-navigation/native';
import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import TextEle from '../TextEle';
import styles from './styles';

const RAButton = ({ ...rest }) => {
  const { colors } = useTheme();
  return (
    <RectButton
      {...rest}
      rippleColor={colors.text}
      style={[
        styles.button,
        {
          backgroundColor: colors.background,
          color: colors.text,
        },
        rest.style,
      ]}>
      <TextEle variant="buttonText">{rest.title}</TextEle>
    </RectButton>
  );
};

export default RAButton;
