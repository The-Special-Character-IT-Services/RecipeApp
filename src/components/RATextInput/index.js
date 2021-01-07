import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import TextEle from '../TextEle';
import styles from './styles';

const RATextInput = ({
  field: { name, value },
  form: { touched, errors, handleBlur, handleChange },
  style,
  ...rest
}) => (
  <>
    <TextInput
      name={name}
      value={value}
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      autoCapitalize="none"
      autoCorrect={false}
      allowFontScaling={false}
      style={[styles.textInput, style]}
      placeholderTextColor="white"
      {...rest}
    />
    {touched[name] && errors[name] && <TextEle>{errors[name]}</TextEle>}
  </>
);

RATextInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
  }).isRequired,
  style: PropTypes.string,
};

RATextInput.defaultProps = {
  style: '',
};

export default RATextInput;
