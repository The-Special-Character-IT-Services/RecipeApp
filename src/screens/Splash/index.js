import React from 'react';
import { SafeAreaView, Text, Pressable } from 'react-native';

const index = ({ navigation }) => (
  <SafeAreaView>
    <Text>Splash Screen</Text>
    <Pressable
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <Text>Move to Login Page</Text>
    </Pressable>
  </SafeAreaView>
);

export default index;
