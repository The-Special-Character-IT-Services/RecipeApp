/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';

import ShareButton from '@components/ShareButton';
import LikeButton from '@components/LikeButton';
import PriceTag from '@components/PriceTag';

import Verification from '@screens/Verification';
import Login from '@screens/Login';
import Registration from '@screens/Registration';
import Home from '@screens/Home';
import RecipeDetail from '@screens/RecipeDetail';
import RecipeVideo from '@screens/RecipeVideo';
import Splash from '@screens/Splash';
import Initial from '@screens/Initial';
import Profile from '@screens/Profile';
import Search from '@screens/Search';

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
      <MainStack.Screen name="Splash" component={Splash} />
      <MainStack.Screen name="Initial" component={Initial} />
      <MainStack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: true, title: 'Search', headerTitleAlign: 'center' }}
      />
      <MainStack.Screen
        name="RecipeVideo"
        component={RecipeVideo}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
      <MainStack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
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
        name="PriceTag"
        component={PriceTag}
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
