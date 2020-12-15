import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

// eslint-disable-next-line react/prop-types
const RATextInput = ({ style, ...rest }) => (
  <TextInput
    autoCapitalize="none"
    autoCorrect={false}
    allowFontScaling={false}
    style={[styles.textInput, style]}
    {...rest}
  />
);

export default RATextInput;
