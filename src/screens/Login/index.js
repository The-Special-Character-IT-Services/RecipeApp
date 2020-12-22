/* eslint-disable import/no-named-as-default */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { ImageBackground, Dimensions, KeyboardAvoidingView } from 'react-native';
import Form from '../../components/Form';
import { initialValues, loginForm } from './fields';
import LoginImage from '../../assets/pics/LoginImage.png';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Login = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <ImageBackground source={LoginImage} style={{ height: windowHeight, width: windowWidth }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={40}
        style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
        <Form initialValues={initialValues} fields={loginForm} onSubmit={onSubmit} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;
