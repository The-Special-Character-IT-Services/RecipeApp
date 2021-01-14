import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { Pressable, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import VisibilityIcon from '@assets/icons/visibility.svg';
import VisibilityOffIcon from '@assets/icons/visibility_off.svg';
import DropDownIcon from '@assets/icons/arrow_drop_down.svg';
import RAText from '@components/RAText';
import countryCodes from 'country-codes-list';
import Modal from 'react-native-modal';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { deviceHeight, deviceWidth } from '@utils/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

const RATextInput = ({
  field: { name, value },
  form: { touched, errors, handleBlur, handleChange, values, setFieldValue },
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  style,
  innerRef,
  ...rest
}) => {
  const { colors, dark } = useTheme();
  const [secure, setSecure] = useState(!!rest.secureTextEntry);
  const India = countryCodes.findOne('countryCallingCode', values['countryCode']);
  const [selectedCountry, setSelectedCountry] = useState(India);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
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
      {rest.keyboardType === 'phone-pad' && (
        <>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              position: 'absolute',
              left: 58,
              top: 0,
              zIndex: 1,
              paddingVertical: 16,
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RAText>{selectedCountry.flag}</RAText>
            <DropDownIcon height={24} width={24} fill="black" />
          </Pressable>
          <Modal
            onRequestClose={() => setModalVisible(false)}
            isVisible={modalVisible}
            style={{ margin: 0 }}>
            <FlatList
              data={countryCodes.all()}
              contentContainerStyle={{
                backgroundColor: '#fff',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
              }}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedCountry(item);
                    setFieldValue('countryCode', item.countryCallingCode);
                  }}>
                  <RectButton>
                    <View accessible style={{ flexDirection: 'row', padding: 10 }}>
                      <RAText>{item.flag}</RAText>
                      <RAText numberOfLines={1} style={{ flex: 1, paddingHorizontal: 10 }}>
                        {item.countryNameEn}
                      </RAText>
                    </View>
                  </RectButton>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={item => `${item.countryCode}`}
            />
          </Modal>
        </>
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
            paddingLeft: LeftIcon ? (rest.keyboardType === 'phone-pad' ? 120 : 58) : 24,
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
