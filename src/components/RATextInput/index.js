import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import TextEle from '../TextEle';
import styles from './styles';

// eslint-disable-next-line react/prop-types
const RATextInput = ({
  field,
  form: { touched, errors, handleBlur, handleChange },
  style,
  ...rest
}) => (
  <>
    <TextInput
      {...field}
      onChangeText={handleChange(field.name)}
      onBlur={handleBlur(field.name)}
      autoCapitalize="none"
      autoCorrect={false}
      allowFontScaling={false}
      style={[styles.textInput, style]}
      {...rest}
    />
    {touched[field.name] && errors[field.name] && <TextEle>{errors[field.name]}</TextEle>}
  </>
);

RATextInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
  }).isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default RATextInput;
