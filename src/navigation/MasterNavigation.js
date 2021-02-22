/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Pressable, View, Text } from 'react-native';

import ShareButton from '@components/ShareButton';
import LikeButton from '@components/LikeButton';
import YoutubeVideo from '@screens/YoutubeVideo';
import { UserContext } from '@context/userContext';

const MainStack = createStackNavigator();

const MainStackScreen = ({ route }) => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.primary,
        title: false,
      }}>
      {user ? (
        <>
          <MainStack.Screen name="Home" getComponent={() => require('@screens/Home').default} />
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
            name="PurchaseUser"
            getComponent={() => require('@screens/PurchaseUser').default}
            options={{ headerShown: true, headerTransparent: true }}
          />

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
          {/* <MainStack.Screen
        name="Profile"
        getComponent={() => require('@screens/TabProfile').default}
        options={{
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: colors.primary, fontSize: 17, marginRight: 20 }}>Logout</Text>
              </Pressable>
            </View>
          ),
          title: 'Profile',
          headerTitleAlign: 'center',
        }}
      /> */}
          <MainStack.Screen
            name="FilterList"
            getComponent={() => require('../screens/FilterList').default}
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
                  <LikeButton withBackground={false} />
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
              headerShown: true,
              headerTransparent: 1,
              headerTintColor: colors.primary,
            })}
          />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="Initial"
            getComponent={() => require('@screens/Initial').default}
          />
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
        </>
      )}
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
