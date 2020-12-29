import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';
import Initial from '../screens/Initial';
import Registration from '../screens/Registration';
import Verification from '../screens/Verification';

const ModalStack = createStackNavigator();

const ModalStackScreen = () => (
  <ModalStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <ModalStack.Screen name="Initial" component={Initial} />
    <ModalStack.Screen name="Verification" component={Verification} />
    <ModalStack.Screen name="LoginModal" component={Login} />
    <ModalStack.Screen name="RegistrationModal" component={Registration} />
  </ModalStack.Navigator>
);

export default ModalStackScreen;
