import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { Pressable, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RAText from '@components/RAText';
import SearchBar from '@components/Search';
import countryCodes from 'country-codes-list';
import Modal from 'react-native-modal';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import TextEle from '@components/TextEle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

const RATextInput = ({
  field: { name, value },
  form: { touched, errors, handleBlur, handleChange, values, setFieldValue },
  leftIcon,
  rightIcon,
  style,
  innerRef,
  ...rest
}) => {
  const { colors, dark } = useTheme();
  const [secure, setSecure] = useState(!!rest.secureTextEntry);
  const India = countryCodes.findOne('countryCallingCode', values?.countryCode);
  const [selectedCountry, setSelectedCountry] = useState(India);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');

  return (
    <View style={{ marginVertical: 8 }}>
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={24}
          color={colors.primary}
          style={{
            position: 'absolute',
            left: 20,
            top: 16,
          }}
        />
      )}
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={24}
          color={colors.primary}
          style={{
            position: 'absolute',
            right: 20,
            top: 16,
          }}
        />
      )}
      {rest.secureTextEntry && (
        <Pressable
          style={{
            position: 'absolute',
            right: 20,
            top: 16,
            zIndex: 10,
          }}
          onPress={() => setSecure(!secure)}>
          {secure ? (
            <Icon name="eye-off-outline" size={24} color={colors.primary} />
          ) : (
            <Icon name="eye-outline" size={24} color={colors.primary} />
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
            <Icon name="caret-down" size={24} color={colors.text} />
          </Pressable>
          <Modal
            onRequestClose={() => setModalVisible(false)}
            isVisible={modalVisible}
            style={{ margin: 0 }}>
            <View style={{ backgroundColor: '#fff', paddingTop: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <TextEle variant="title">Search your Country here</TextEle>
              </View>

              <SearchBar onChangeText={t => setText(t)} value={text} />
            </View>
            <FlatList
              data={
                text
                  ? countryCodes.all().filter(x => x.countryNameEn.includes(text))
                  : countryCodes.all()
              }
              contentContainerStyle={{
                flex: 1,
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
                      <RAText
                        numberOfLines={1}
                        style={{ flex: 1, paddingHorizontal: 10, color: colors.primary }}>
                        {item.countryNameEn}
                      </RAText>
                      <View>
                        <RAText
                          numberOfLines={1}
                          style={{ flex: 1, paddingHorizontal: 10, color: colors.primary }}>
                          {`+${item.countryCallingCode}`}
                        </RAText>
                      </View>
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
            paddingLeft: leftIcon ? (rest.keyboardType === 'phone-pad' ? 120 : 58) : 24,
            paddingRight: !!rightIcon || !!rest.secureTextEntry ? 64 : 24,
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
    values: PropTypes.shape({
      countryCode: PropTypes.string,
    }),
    setFieldValue: PropTypes.func,
  }).isRequired,
  innerRef: PropTypes.number.isRequired,
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
