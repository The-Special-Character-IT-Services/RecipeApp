import React, { useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import { ImageBackground, Dimensions, KeyboardAvoidingView, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Form from '@components/Form';
import LoginImage from '@assets/images/LoginImage.png';
import TextEle from '@components/TextEle';
import RAButton from '@components/RAButton';
import FoodCourter from '@assets/images/FoodCourter.png';
import axios from '@utils/axios';
import { initialValues, RegistrationForm } from './credentials';

const { width: windowWidth } = Dimensions.get('window');

const Registration = () => {
  const { colors } = useTheme();
  const formRef = useRef();

  const onSubmit = async values => {
    try {
      const { confirmPassword, ...userData } = values;
      const user = await axios.post('auth/local/register', userData);
      console.warn(user);
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <ImageBackground source={LoginImage} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={40}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Image source={FoodCourter} style={{ height: 100, width: 100, marginTop: 20 }} />
        {/* <GoogleLogo height={24} width={24} fill="white" /> */}

        <View style={{ width: windowWidth }}>
          <View style={{ alignItems: 'center' }}>
            <TextEle variant="header2" style={{ color: 'white', alignItems: 'center' }}>
              Welcome!
            </TextEle>
            <TextEle>Please Enter Your Number</TextEle>
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
    </ImageBackground>
  );
};

Registration.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Registration;
