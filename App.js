/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { SWRConfig } from 'swr';

import { useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import MasterNavigation from '@navigation/MasterNavigation';
import { RADarkTheme, RALightTheme } from '@theme/index';
import fetcher from '@utils/fetcher';
import YoutubeVideo from '@screens/YoutubeVideo';
import UserProvider from '@context/userContext';
import Toast from 'react-native-toast-message';
import { isIOS } from './src/utils';
import YoutubeFilter from './src/screens/YoutubeFilter';

// import Login from './src/screens/Login/index';

const RootStack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  const routeNameRef = useRef();
  const navigationRef = useRef();

  const currentTheme = scheme === 'dark' ? RADarkTheme : RALightTheme;

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={currentTheme.colors.card}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <SWRConfig
        value={{
          fetcher,
        }}>
        <UserProvider>
          <KeyboardAvoidingView
            {...(isIOS && { behavior: 'padding' })}
            style={{ flex: 1 }}
            enabled={isIOS}>
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
                <RootStack.Screen name="YoutubeFilter" component={YoutubeFilter} />
                <RootStack.Screen name="YoutubeVideo" component={YoutubeVideo} />
              </RootStack.Navigator>
            </NavigationContainer>
          </KeyboardAvoidingView>
        </UserProvider>
      </SWRConfig>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

export default App;
