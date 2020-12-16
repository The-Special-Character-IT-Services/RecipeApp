import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import TextEle from '../../components/TextEle';

const Splash = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <SafeAreaView>
      <TextEle>Splash Screen</TextEle>
    </SafeAreaView>
  );
};

Splash.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Splash;
