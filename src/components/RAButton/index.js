/* eslint-disable react/forbid-prop-types */
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

const RAButton = ({ children, ...rest }) => {
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
      {children}
    </RectButton>
  );
};

RAButton.propTypes = {
  children: PropTypes.object.isRequired,
};
export default RAButton;
