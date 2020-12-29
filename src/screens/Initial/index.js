/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { ImageBackground, Dimensions, KeyboardAvoidingView, View, Image } from 'react-native';
import LoginImage from '../../assets/pics/LoginImage.png';
import TextEle from '../../components/TextEle';
import RAButton from '../../components/RAButton';
import FoodCourter from '../../assets/pics/FoodCourter.png';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Initial = ({ navigation }) => {
  const { colors } = useTheme();

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
        </View>
        <View style={{ width: '100%' }}>
          <RAButton
            onPress={() => navigation.navigate('Login')}
            style={{ opacity: 1, backgroundColor: colors.background }}>
            <TextEle variant="buttonText">Login</TextEle>
          </RAButton>
          <View>
            <RAButton
              style={{ opacity: 1, flexDirection: 'row' }}
              onPress={() => navigation.navigate('Registration')}>
              <TextEle variant="buttonText">Register</TextEle>
            </RAButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

Initial.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default Initial;
