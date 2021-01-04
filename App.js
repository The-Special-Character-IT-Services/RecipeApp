/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import ModalNavigation from '@navigation/ModalNavigation';
import MasterNavigation from '@navigation/MasterNavigation';
import { isIOS } from './src/utils';

// import Login from './src/screens/Login/index';

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F6552E',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#F6552E',
  },
};

const RootStack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  const routeNameRef = useRef();
  const navigationRef = useRef();

  const currentTheme = scheme === 'dark' ? MyDarkTheme : MyDefaultTheme;

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={currentTheme.colors.card}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : undefined} style={{ flex: 1 }}>
        <NavigationContainer
          ref={navigationRef}
          theme={currentTheme}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              // Change this line to use another Mobile analytics SDK
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }

            // Save the current route name for later comparision
            routeNameRef.current = currentRouteName;
          }}>
          <RootStack.Navigator initialRouteName="Main" mode="modal" headerMode="none">
            <RootStack.Screen
              name="Main"
              component={MasterNavigation}
              options={{
                headerShown: true,
                headerTransparent: 1,
                headerTintColor: currentTheme.colors.primary,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
              }}
            />
            <RootStack.Screen
              name="Modal"
              component={ModalNavigation}
              options={{
                headerShown: true,
                headerTransparent: 1,
                headerTintColor: currentTheme.colors.primary,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default App;
