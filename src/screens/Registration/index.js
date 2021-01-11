import React, { useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import { Dimensions, KeyboardAvoidingView, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Form from '@components/Form';
import TextEle from '@components/TextEle';
import RAButton from '@components/RAButton';
import { useHeaderHeight } from '@react-navigation/stack';
import axios from '@utils/axios';
import { isIOS } from '@utils/index';
import RAText from '@components/RAText';
import { initialValues, RegistrationForm } from './credentials';

const { width: windowWidth } = Dimensions.get('window');

const Registration = ({ navigation }) => {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();
  const formRef = useRef();

  const onSubmit = async values => {
    try {
      const { confirmPassword, ...userData } = values;
      let formData = userData;
      if (!isIOS) {
        const hash = await SmsRetriever.getAppSignature();
        formData = { ...formData, hash };
      }
      const user = await axios.post('auth/local/registerPhone', formData);
      console.warn(user.data);
      navigation.navigate('Verification');

      // const token = await axios.get(
      //   `/auth/sms-confirmation?confirmation=${user.data.confirmationSMSToken}`,
      // );
      // console.warn(token.data);
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={40}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: headerHeight,
      }}>
      <View style={{ width: windowWidth }}>
        <View style={{ alignItems: 'center' }}>
          <RAText variant="h1">Welcome!</RAText>
          <RAText variant="p2">Please enter your account here</RAText>
        </View>
        <Form
          ref={formRef}
          initialValues={initialValues}
          fields={RegistrationForm}
          onSubmit={onSubmit}
        />
      </View>
      <View style={{ width: '100%' }}>
        <RAButton
          style={{ opacity: 0.6, backgroundColor: colors.background }}
          onPress={() => formRef.current.handleSubmit()}>
          <TextEle variant="buttonText">Continue</TextEle>
        </RAButton>
      </View>
    </KeyboardAvoidingView>
  );
};

Registration.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Registration;
