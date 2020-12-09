import React from 'react';
import { SafeAreaView, Pressable } from 'react-native';
import TextEle from '../../components/TextEle';

const index = ({ navigation }) => (
  <SafeAreaView>
    <TextEle>Splash Screen</TextEle>
    <Pressable
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <TextEle>Move to Login Page</TextEle>
    </Pressable>
  </SafeAreaView>
);

export default index;
