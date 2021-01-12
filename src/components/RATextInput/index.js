import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { Pressable, TextInput, View } from 'react-native';
import VisibilityIcon from '@assets/icons/visibility.svg';
import VisibilityOffIcon from '@assets/icons/visibility_off.svg';
import styles from './styles';

const RATextInput = ({
  field: { name, value },
  form: { touched, errors, handleBlur, handleChange },
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  style,
  innerRef,
  ...rest
}) => {
  const { colors, dark } = useTheme();
  const [secure, setSecure] = useState(!!rest.secureTextEntry);
  return (
    <View style={{ marginVertical: 8 }}>
      {LeftIcon && (
        <LeftIcon
          height={24}
          width={24}
          fill="red"
          style={{ position: 'absolute', left: 24, top: 16 }}
        />
      )}
      {RightIcon && (
        <RightIcon
          height={24}
          width={24}
          fill="red"
          style={{ position: 'absolute', right: 24, top: 16 }}
        />
      )}
      {rest.secureTextEntry && (
        <Pressable
          onPress={() => setSecure(!secure)}
          style={{
            position: 'absolute',
            right: 24,
            top: 0,
            zIndex: 1,
            paddingVertical: 16,
            paddingHorizontal: 8,
          }}>
          {secure ? (
            <VisibilityOffIcon height={24} width={24} fill="red" />
          ) : (
            <VisibilityIcon height={24} width={24} fill="red" />
          )}
        </Pressable>
      )}
      <TextInput
        ref={innerRef}
        name={name}
        value={value}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        style={[
          styles.textInput,
          style,
          {
            color: colors.text,
            paddingLeft: LeftIcon ? 58 : 24,
            paddingRight: !!RightIcon || !!rest.secureTextEntry ? 64 : 24,
            borderColor: touched[name] && errors[name] ? colors.error : colors.border,
          },
        ]}
        keyboardAppearance={dark ? 'dark' : 'light'}
        placeholderTextColor={colors.text}
        {...rest}
        secureTextEntry={secure}
      />
    </View>
  );
};

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
  leftIcon: PropTypes.func,
  rightIcon: PropTypes.func,
};

RATextInput.defaultProps = {
  style: '',
  leftIcon: null,
  rightIcon: null,
};

export default RATextInput;
