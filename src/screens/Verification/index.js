import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import SmsRetriever from 'react-native-sms-retriever';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, KeyboardAvoidingView, View, Image, TextInput } from 'react-native';
import axios from '@utils/axios';
import TextEle from '@components/TextEle';
import RAButton from '@components/RAButton';
import FoodCourter from '@assets/images/FoodCourter.png';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Verification = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onChangeText = val => {
    setText(val);
  };

  const verifyOTP = useCallback(async otp => {
    const token = await axios.get(`/auth/sms-confirmation?confirmation=${otp}`);
    console.warn(token.data);
  }, []);

  const onSmsListener = useCallback(async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          SmsRetriever.removeSmsListener();
          const otp = /(\d{5})/g.exec(event.message)[1];
          verifyOTP(otp);
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }, [verifyOTP]);

  useEffect(() => {
    onSmsListener();
  }, [onSmsListener]);

  return (
    <View style={{ height: windowHeight, width: windowWidth, flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        topInset={insets.top}
        style={{
          justifyContent: 'space-between',
          paddingVertical: 10,
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={FoodCourter}
          style={{ height: 100, width: 100, marginTop: 20, marginVertical: 30 }}
        />
        <View style={{ width: '100%', marginVertical: 20, justifyContent: 'center' }}>
          <TextInput
            onChangeText={onChangeText}
            text={text}
            style={{
              borderWidth: 2,
              borderColor: colors.text,
              color: colors.text,
              marginHorizontal: 10,
              borderRadius: 5,
            }}
          />
          <RAButton
            onPress={() => navigation.navigate('Home')}
            style={{ opacity: 1, backgroundColor: colors.primary }}>
            <TextEle variant="buttonText">Submit</TextEle>
          </RAButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

Verification.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default Verification;
