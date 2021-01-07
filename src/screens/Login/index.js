import React, { useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import Config from 'react-native-config';
import { ImageBackground, KeyboardAvoidingView, View, Image, Alert } from 'react-native';
import Form from '@components/Form';
import TextEle from '@components/TextEle';
import RAButton from '@components/RAButton';
import LoginImage from '@assets/images/LoginImage.png';
import FoodCourter from '@assets/images/FoodCourter.png';
import GoogleLogo from '@assets/icons/logo-google.svg';
import axios from '@utils/axios';
import { FOODCOUTURE_TOKEN } from '@constants/index';
import { initialValues, loginForm } from './fields';

// const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

console.warn(Config.GOOGLE_CLIENT_ID);

GoogleSignin.configure({
  webClientId: Config.GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

const Login = ({ navigation }) => {
  const { colors } = useTheme();
  const formRef = useRef();

  const onSubmit = async values => {
    try {
      const user = await axios.post('auth/local', values);
      await AsyncStorage.setItem(FOODCOUTURE_TOKEN, user.data.jwt);
      navigation.navigate('Home');
    } catch (error) {
      console.warn(error.message);
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      console.warn(data);
      const res = await fetch(
        `http://2917af612e67.ngrok.io/auth/google/callback/?id_token=${data.idToken}`,
      );
      const auth = await res.json();
      console.warn(auth);
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
      }
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
        <View>
          <TextEle variant="header2" style={{ color: 'white', alignItems: 'center' }}>
            Welcome to Food Courture
          </TextEle>
          <Form
            ref={formRef}
            initialValues={initialValues}
            fields={loginForm}
            onSubmit={onSubmit}
          />
        </View>
        <View style={{ width: '100%' }}>
          <RAButton
            onPress={() => {
              formRef.current?.handleSubmit();
            }}
            style={{ opacity: 0.6, backgroundColor: colors.background }}>
            <TextEle variant="buttonText">Continue</TextEle>
          </RAButton>
          <RAButton style={{ opacity: 1, flexDirection: 'row' }} onPress={signIn}>
            <GoogleLogo height={24} width={24} fill={colors.text} style={{ marginRight: 20 }} />
            <TextEle variant="buttonText">Sign in with google</TextEle>
          </RAButton>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log(`login has error: ${result.error}`);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.warn(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
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
