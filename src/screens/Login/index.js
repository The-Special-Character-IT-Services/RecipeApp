import React from 'react';
import { Text, SafeAreaView, Pressable } from 'react-native';

const index = ({ navigation }) => (
  <SafeAreaView>
    <Text>Login Screen</Text>
    <Pressable
      onPress={() => {
        navigation.navigate('Registration');
      }}>
      <Text>Move to Registration Page</Text>
    </Pressable>
  </SafeAreaView>
);

export default index;
