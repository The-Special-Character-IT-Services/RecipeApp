import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  View,
  Image,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import { initialValues, RegistrationForm } from './credentials';
import LoginImage from '../../assets/images/LoginImage.png';
import TextEle from '../../components/TextEle';
import RAButton from '../../components/RAButton';
import FoodCourter from '../../assets/images/FoodCourter.png';
import GoogleLogo from '../../assets/icons/logo-google.svg';

const { width: windowWidth } = Dimensions.get('window');

const Registration = ({ navigation }) => {
  const { colors } = useTheme();

  const onSubmit = values => {
    console.log(values);
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
          <Form initialValues={initialValues} fields={RegistrationForm} onSubmit={onSubmit} />
        </View>
        <View style={{ width: '100%' }}>
          <Pressable onPress={() => navigation.navigate('Verification')}>
            <RAButton style={{ opacity: 0.6, backgroundColor: colors.background }}>
              <TextEle variant="buttonText">Continue</TextEle>
            </RAButton>
          </Pressable>
          <View>
            <RAButton style={{ opacity: 1, flexDirection: 'row' }}>
              <GoogleLogo height={24} width={24} fill={colors.text} style={{ marginRight: 20 }} />
              <TextEle variant="buttonText">Sign up with google</TextEle>
            </RAButton>
          </View>
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
