import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MasterNavigation from './src/navigation/MasterNavigation';
import ModalNavigation from './src/navigation/ModalNavigation';

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
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={currentTheme.colors.card}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer theme={currentTheme}>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Main" component={MasterNavigation} />
          <RootStack.Screen
            name="Modal"
            component={ModalNavigation}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
