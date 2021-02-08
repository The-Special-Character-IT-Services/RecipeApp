/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';

import ShareButton from '@components/ShareButton';
import LikeButton from '@components/LikeButton';

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  const { colors } = useTheme();
  return (
    <MainStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.primary,
        title: false,
      }}>
      <MainStack.Screen name="Splash" getComponent={() => require('@screens/Splash').default} />
      <MainStack.Screen name="Initial" getComponent={() => require('@screens/Initial').default} />
      <MainStack.Screen
        name="Verification"
        getComponent={() => require('@screens/Verification').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="ResetPassword"
        getComponent={() => require('@screens/ResetPassword').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="Login"
        getComponent={() => require('@screens/Login').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="ForgotPassword"
        getComponent={() => require('@screens/ForgotPassword').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="Registration"
        getComponent={() => require('@screens/Registration').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen name="Home" getComponent={() => require('@screens/Home').default} />
      <MainStack.Screen
        name="Search"
        getComponent={() => require('@screens/Search').default}
        options={{ headerShown: true, title: 'Search', headerTitleAlign: 'center' }}
      />
      <MainStack.Screen
        name="RecipeVideo"
        getComponent={() => require('@screens/RecipeVideo').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="Profile"
        getComponent={() => require('@screens/Profile').default}
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
      <MainStack.Screen
        name="RecipeDetail"
        getComponent={() => require('@screens/RecipeDetail').default}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <ShareButton />
              <LikeButton />
            </View>
          ),
          headerShown: true,
          headerTransparent: 1,
          headerTintColor: colors.primary,
        }}
      />
      <MainStack.Screen
        name="CourseDetails"
        getComponent={() => require('@screens/CourseDetails').default}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <LikeButton />
            </View>
          ),
          headerShown: true,
          headerTransparent: 1,
          headerTintColor: colors.primary,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
