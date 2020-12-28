/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Home from '../screens/Home';
import RecipeDetail from '../screens/RecipeDetail';
import LikeButton from '../components/LikeButton';
import RecipeVideo from '../screens/RecipeVideo';
import Splash from '../screens/Splash';
import Initial from '../screens/Initial';
import ShareButton from '../components/ShareButton';
import Profile from '../screens/Profile';
import PriceTag from '../components/PriceTag';
import TabSearch from '../screens/TabSearch';

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  const { colors } = useTheme();
  return (
    <MainStack.Navigator
      initialRouteName="Initial"
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.primary,
        title: false,
      }}>
      <MainStack.Screen name="Splash" component={Splash} />
      <MainStack.Screen name="Initial" component={Initial} />
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="Registration" component={Registration} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="TabSearch"
        component={TabSearch}
        options={{ headerShown: true, title: 'Search', headerTitleAlign: 'center' }}
      />
      <MainStack.Screen
        name="RecipeVideo"
        component={RecipeVideo}
        options={{ headerShown: true }}
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
