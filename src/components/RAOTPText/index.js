import PropTypes from 'prop-types';
import styles from '@components/RATextInput/styles';
// import TextEle from '@components/TextEle';
import React, { createRef, useMemo, useState } from 'react';
import { View, TextInput, Keyboard } from 'react-native';

const RAOTPText = ({ style, length, ...rest }) => {
  const [val, setVal] = useState(Array(length).fill(''));
  const inputRefs = useMemo(() => [...Array(length).keys()].map(() => createRef()), [length]);

  const onOtpKeyPress = index => ({ nativeEvent: { key: value } }) => {
    // auto focus to previous InputText if value is blank and existing value is also blank
    if (value === 'Backspace') {
      if (index === 0) {
        Keyboard.dismiss();
      } else {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const onOtpChange = index => value => {
    setVal(val.map((x, i) => (i === index ? value : x)));
    if (value !== '') {
      if (index + 1 >= length) {
        Keyboard.dismiss();
      } else {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {inputRefs.map((x, i) => (
          <TextInput
            ref={x}
            value={val[i] || ''}
            onKeyPress={onOtpKeyPress(i)}
            onChangeText={onOtpChange(i)}
            onFocus={() => inputRefs[i].current.clear()}
            autoCapitalize="none"
            autoCorrect={false}
            allowFontScaling={false}
            style={[styles.textInput, { marginHorizontal: 5, textAlign: 'center' }]}
            placeholderTextColor="white"
            maxLength={1}
            keyboardType="numeric"
            {...rest}
          />
        ))}
      </View>
      {/* {touched[name] && errors[name] && <TextEle>{errors[name]}</TextEle>} */}
    </>
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
  }).isRequired,
  length: PropTypes.number.isRequired,
  style: PropTypes.string,
};

RAOTPText.defaultProps = {
  style: '',
};

export default RAOTPText;
