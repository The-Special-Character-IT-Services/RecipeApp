/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

import {
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  View,
  Image,
  Pressable,
} from 'react-native';
import Form from '../../components/Form';
import { initialValues, loginForm } from './fields';
import LoginImage from '../../assets/pics/LoginImage.png';
import TextEle from '../../components/TextEle';
import RAButton from '../../components/RAButton';
import FoodCourter from '../../assets/pics/FoodCourter.png';
import GoogleLogo from '../../assets/icons/logo-google.svg';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const { colors } = useTheme();

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <ImageBackground source={LoginImage} style={{ height: windowHeight, width: windowWidth }}>
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
        <View>
          <TextEle variant="header2" style={{ color: 'white', alignItems: 'center' }}>
            Welcome to Food Courture
          </TextEle>
          <Form initialValues={initialValues} fields={loginForm} onSubmit={onSubmit} />
        </View>
        <View style={{ width: '100%' }}>
          <RAButton style={{ opacity: 0.6, backgroundColor: colors.background }}>
            <TextEle variant="buttonText">Continue</TextEle>
          </RAButton>
          <View>
            <RAButton style={{ opacity: 1, flexDirection: 'row' }}>
              <GoogleLogo height={24} width={24} fill={colors.text} style={{ marginRight: 20 }} />
              <TextEle variant="buttonText">Sign in with google</TextEle>
            </RAButton>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              justifyContent: 'center',
            }}>
            <TextEle variant="body1" style={{ color: 'white' }}>
              Don't Have any account?
            </TextEle>
            <Pressable
              rippleColor="black"
              onPress={() => navigation.navigate('Registration')}
              style={{
                marginHorizontal: 5,
                borderBottomWidth: 1,
                borderColor: 'white',
                backgroundColor: 'blue',
              }}>
              <TextEle variant="buttonText" style={{ color: 'white' }}>
                Sign Up Here
              </TextEle>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

Login.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default Login;
