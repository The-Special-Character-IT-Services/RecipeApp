import { useTheme } from '@react-navigation/native';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const RAText = ({ variant, style, ...rest }) => {
  const { colors } = useTheme();
  return (
    <Text
      allowFontScaling={false}
      style={[styles[variant], { color: colors.text }, style]}
      {...rest}
    />
  );
};

RAText.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'p1', 'p2', 's', 'bt1', 'bt2']),
  style: Text.propTypes.style,
};

RAText.defaultProps = {
  variant: 'p1',
  style: {},
};

export default RAText;
