import PropTypes from 'prop-types';
import TextEle from '@components/TextEle';
import React from 'react';
import { View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';

const RAOTPText = ({ field: { name, value }, form: { handleBlur, handleChange } }) => {
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: handleChange(name),
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      cellCount={4}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[styles.cellRoot, isFocused && styles.focusCell]}>
          <TextEle style={styles.cellText}>{symbol || (isFocused && <Cursor />)}</TextEle>
        </View>
      )}
    />
  );
};

RAOTPText.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    setFieldValue: PropTypes.func,
  }).isRequired,
  style: PropTypes.string,
};

RAOTPText.defaultProps = {
  style: '',
};

export default RAOTPText;
