import React from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import Config from 'react-native-config';
import { View, Alert, Pressable } from 'react-native';
import Form from '@components/Form';
// import TextEle from '@components/TextEle';
// import RAButton from '@components/RAButton';
// import LoginImage from '@assets/images/LoginImage.png';
// import FoodCourter from '@assets/images/FoodCourter.png';
import GoogleLogo from '@assets/icons/logo-google.svg';
import FacebookLogo from '@assets/icons/facebook.svg';
import axios from '@utils/axios';
// import { FOODCOUTURE_TOKEN } from '@constants/index';
import RAText from '@components/RAText';
import { useHeaderHeight } from '@react-navigation/stack';
import RAButton1 from '@components/RAButton1';
import { isIOS } from '@utils/';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { initialValues, loginForm, formRef } from './fields';

// const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

GoogleSignin.configure({
  webClientId: Config.GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

const Login = ({ navigation }) => {
  const { colors } = useTheme();
  const headerHight = useHeaderHeight();

  const onSubmit = async values => {
    console.log(values);
    // try {
    //   const user = await axios.post('auth/local', values);
    //   await AsyncStorage.setItem(FOODCOUTURE_TOKEN, user.data.jwt);
    //   navigation.navigate('Home');
    // } catch (error) {
    //   console.warn(error.message);
    // }
  };

  const signInFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            axios
              .get(
                `https://ca5e9afb56c8.ngrok.io/auth/facebook/callback/?access_token=${data.accessToken}`,
              )
              .then(val => {
                console.log(val);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      },
      error => {
        console.log(`Login fail with error: ${error}`);
      },
    );
  };

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      const res = await axios.get(
        `https://ca5e9afb56c8.ngrok.io/auth/google/callback/?access_token=${data.idToken}`,
      );
      console.log(res.data);
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: headerHight,
          marginBottom: 20,
          marginHorizontal: 20,
        }}>
        <View style={{ flex: 3, justifyContent: 'flex-end' }}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <RAText variant="h1" style={{ marginBottom: 8 }}>
              Welcome Back
            </RAText>
            <RAText variant="p2">Please enter your account here</RAText>
          </View>
          <Form
            ref={formRef}
            initialValues={initialValues}
            fields={loginForm}
            onSubmit={onSubmit}
          />
          <Pressable
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ marginVertical: 8 }}>
            <RAText variant="p2" style={{ textAlign: 'right' }}>
              Forgot password?
            </RAText>
          </Pressable>
        </View>
        <View style={{ flex: 2, justifyContent: 'space-evenly' }}>
          <RAButton1 variant="fill" text="Login" onPress={formRef.current?.handleSubmit} />
          <RAText variant="p2" style={{ textAlign: 'center', marginVertical: 8 }}>
            Or continue with
          </RAText>
          {isIOS ? (
            <RAButton1
              variant="fill"
              text="Facebook"
              onPress={signInFacebook}
              icon={({ ...rest }) => <FacebookLogo {...rest} fill="#fff" />}
            />
          ) : (
            <RAButton1
              variant="fill"
              text="Google"
              onPress={signInGoogle}
              icon={({ ...rest }) => <GoogleLogo {...rest} fill="#fff" />}
            />
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 8 }}>
            <RAText variant="p2" style={{ textAlign: 'center', marginHorizontal: 8 }}>
              Don’t have any account?
            </RAText>
            <Pressable onPress={() => navigation.navigate('Registration')}>
              <RAText variant="h3" style={{ color: colors.primary }}>
                Sign Up
              </RAText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

Login.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default Login;
