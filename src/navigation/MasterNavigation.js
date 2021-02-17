/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Pressable, View, Text } from 'react-native';

import ShareButton from '@components/ShareButton';
import LikeButton from '@components/LikeButton';
import YoutubeVideo from '@screens/YoutubeVideo';

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
      <MainStack.Screen name="Error" getComponent={() => require('@screens/Error').default} />
      <MainStack.Screen name="Initial" getComponent={() => require('@screens/Initial').default} />
      <MainStack.Screen
        name="Verificatiosn"
        getComponent={() => require('@screens/Verification').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="ResetPassword"
        getComponent={() => require('@screens/ResetPassword').default}
        options={{ headerShown: true, headerTransparent: true }}
      />
      <MainStack.Screen
        name="YoutubeFilter"
        getComponent={() => require('@screens/YoutubeFilter').default}
        options={({ navigation }) => ({
          headerShown: true,
          headerTransparent: false,
          title: 'Sort by',
          headerTitleAlign: 'center',
          headerLeft: null,
          headerRight: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ color: colors.primary, fontSize: 20, marginRight: 10 }}>Done</Text>
            </Pressable>
          ),
        })}
      />
      <MainStack.Screen
        name="YoutubeVideo"
        component={YoutubeVideo}
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
      <MainStack.Screen
        name="PurchaseUser"
        getComponent={() => require('@screens/PurchaseUser').default}
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
        name="CuisineList"
        getComponent={() => require('@screens/CuisineList').default}
        options={({ route }) => ({
          title: route.params.name,
          headerShown: true,
          headerTitleAlign: 'center',
        })}
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
        options={({ route }) => ({
          headerShown: true,
          headerTransparent: 1,
          headerTintColor: colors.primary,
        })}
      />
      <MainStack.Screen
        name="CourseDetailsBought"
        getComponent={() => require('@screens/CourseDetailsBought').default}
        options={({ route }) => ({
          headerRight: () => (
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
              <LikeButton courseId={route.params?.id} withBackground={false} />
            </View>
          ),
          headerShown: true,
          headerTransparent: 1,
          headerTintColor: colors.primary,
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
