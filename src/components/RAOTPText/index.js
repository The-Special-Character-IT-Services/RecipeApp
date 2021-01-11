import PropTypes from 'prop-types';
import TextEle from '@components/TextEle';
import React, { createRef, useMemo } from 'react';
import { View, TextInput, Keyboard } from 'react-native';

const RAOTPText = ({
  field: { name, value },
  form: { touched, errors, handleBlur, setFieldValue },
  style,
  ...rest
}) => {
  const inputRefs = useMemo(() => [...Array(value.length).keys()].map(() => createRef()), [
    value.length,
  ]);

  const onOtpKeyPress = index => ({ nativeEvent: { key } }) => {
    if (key === 'Backspace') {
      if (index === 0) {
        Keyboard.dismiss();
      } else {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const onOtpChange = index => txt => {
    const newValue = value.map((x, i) => {
      if (i === index) {
        return txt;
      }
      return x;
    });
    setFieldValue(name, newValue);
    if (txt !== '') {
      if (index + 1 >= value.length) {
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
            value={value[i] || ''}
            onKeyPress={onOtpKeyPress(i)}
            onChangeText={onOtpChange(i)}
            autoCapitalize="none"
            autoCorrect={false}
            allowFontScaling={false}
            style={[
              {
                borderWidth: 2,
                borderColor: errors[name] && !value[i] ? '#FF6464' : '#D0DBEA',
                borderRadius: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.247)',
              },
              { marginHorizontal: 5, textAlign: 'center', height: 72, width: 72 },
              {
                fontFamily: 'Inter-Bold',
                fontSize: 34,
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 41,
                textAlign: 'center',
                color: 'white',
              },
            ]}
            placeholderTextColor="white"
            maxLength={1}
            keyboardType="numeric"
            {...rest}
          />
        ))}
      </View>
      {touched[name] && errors[name] && <TextEle>{errors[name]}</TextEle>}
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
    setFieldValue: PropTypes.func,
  }).isRequired,
  length: PropTypes.number.isRequired,
  style: PropTypes.string,
};

RAOTPText.defaultProps = {
  style: '',
};

export default RAOTPText;
