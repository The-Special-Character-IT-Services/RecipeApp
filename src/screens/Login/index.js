import React from 'react';
import { SafeAreaView, Pressable } from 'react-native';
import TextEle from '../../components/TextEle';

const index = ({ navigation }) => (
  <SafeAreaView>
    <TextEle>Login Screen</TextEle>
    <Pressable
      onPress={() => {
        navigation.navigate('Registration');
      }}>
      <TextEle>Move to Registration Page</TextEle>
    </Pressable>
  </SafeAreaView>
);

export default index;
