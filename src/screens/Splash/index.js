import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FOODCOUTURE_TOKEN } from '@constants/index';

const Splash = ({ navigation }) => {
  const checkAuth = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(FOODCOUTURE_TOKEN);
      if (value !== null) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Initial');
      }
    } catch (e) {
      // error reading value
    }
  }, [navigation]);

  useEffect(() => {
    SplashScreen.hide();
    checkAuth();
  }, [checkAuth]);

  return <SafeAreaView />;
};

Splash.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Splash;
