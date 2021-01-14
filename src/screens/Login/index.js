import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Config from 'react-native-config';
import { View, Pressable } from 'react-native';
import Form from '@components/Form';
import GoogleLogo from '@assets/icons/logo-google.svg';
import FacebookLogo from '@assets/icons/facebook.svg';
import { CancelToken } from 'axios';
import axios from '@utils/axios';
import RAText from '@components/RAText';
import { useHeaderHeight } from '@react-navigation/stack';
import RAButton1 from '@components/RAButton1';
import { isIOS, setToken, showErrorToast } from '@utils/index';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { initialValues, loginForm, formRef } from './fields';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

const Login = ({ navigation }) => {
  const { colors } = useTheme();
  const headerHight = useHeaderHeight();
  const [loading, setLoading] = useState({
    signIn: false,
    google: false,
    facebook: false,
  });

  const cancelSource = useMemo(() => CancelToken.source(), []);

  useEffect(
    () => () => {
      cancelSource.cancel();
    },
    [cancelSource],
  );

  const onSubmit = async values => {
    try {
      setLoading({ ...loading, signIn: true });
      const user = await axios.post(
        'auth/local',
        {
          identifier: `+${values.countryCode}${values.identifier}`,
          password: values.password,
        },
        {
          cancelToken: cancelSource.token,
        },
      );
      await setToken(user.data);
      navigation.navigate('Home');
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading({ ...loading, signIn: false });
    }
  };

  const signInFacebook = async () => {
    try {
      setLoading({ ...loading, facebook: true });
      const result = await LoginManager.logInWithPermissions(['public_profile']);
      if (result.isCancelled) {
        showErrorToast(new Error('Login cancelled'));
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        const val = await axios.get(`auth/facebook/callback/?access_token=${data.accessToken}`, {
          cancelToken: cancelSource.token,
        });
        await setToken(val.data);
        navigation.navigate('Home');
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading({ ...loading, facebook: false });
    }
  };

  const signInGoogle = async () => {
    try {
      setLoading({ ...loading, google: true });
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      const res = await axios.get(`auth/google/callback/?access_token=${data.idToken}`, {
        cancelToken: cancelSource.token,
      });
      await setToken(res.data);
      navigation.navigate('Home');
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          showErrorToast(new Error('SignIn Cancelled'));
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          showErrorToast(new Error('SignIn In Progress'));
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showErrorToast(new Error('play services not available or outdated'));
          break;
        default:
          showErrorToast(new Error('Something went wrong'));
      }
    } finally {
      setLoading({ ...loading, google: false });
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
        <View style={{ flex: 1 }}>
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
            onPress={() => {
              cancelSource.cancel();
              navigation.navigate('ForgotPassword');
            }}
            style={{ marginVertical: 8 }}>
            <RAText variant="p2" style={{ textAlign: 'right' }}>
              Forgot password?
            </RAText>
          </Pressable>
          <RAButton1
            disable={loading.signIn || loading.google || loading.facebook}
            loading={loading.signIn}
            variant="fill"
            text="Login"
            onPress={() => formRef.current?.handleSubmit()}
          />
          <RAText variant="p2" style={{ textAlign: 'center', marginVertical: 8 }}>
            Or continue with
          </RAText>
          {isIOS ? (
            <RAButton1
              disable={loading.signIn || loading.google || loading.facebook}
              loading={loading.facebook}
              variant="fill"
              text="Facebook"
              onPress={signInFacebook}
              icon={({ ...rest }) => <FacebookLogo {...rest} fill="#fff" />}
              {...loading}
            />
          ) : (
            <RAButton1
              disable={loading.signIn || loading.google || loading.facebook}
              loading={loading.google}
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
            <Pressable
              onPress={() => {
                cancelSource.cancel();
                navigation.navigate('Registration');
              }}>
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
