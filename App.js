/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
// import MasterNavigation from './src/navigation/MasterNavigation';
import ModalNavigation from './src/navigation/ModalNavigation';
import PriceTag from './src/components/PriceTag';
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
        <NavigationContainer theme={currentTheme}>
          <RootStack.Navigator mode="modal" headerMode="none">
            {/* <RootStack.Screen name="Login" component={MasterNavigation} /> */}
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
            <RootStack.Screen
              name="PriceTag"
              component={PriceTag}
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
