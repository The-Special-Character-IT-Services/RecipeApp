import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';

const ModalStack = createStackNavigator();

const ModalStackScreen = () => (
  <ModalStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <ModalStack.Screen name="LoginModal" component={Login} />
  </ModalStack.Navigator>
);

export default ModalStackScreen;
