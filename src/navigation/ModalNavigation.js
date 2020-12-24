import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';
import Registration from '../screens/Registration';

const ModalStack = createStackNavigator();

const ModalStackScreen = () => (
  <ModalStack.Navigator
    // intialRouteName="Registration"
    screenOptions={{
      headerShown: false,
    }}>
    <ModalStack.Screen name="LoginModal" component={Login} />
    <ModalStack.Screen name="Registration" component={Registration} />
  </ModalStack.Navigator>
);

export default ModalStackScreen;
