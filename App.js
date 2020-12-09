import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Registration from './src/screens/Registration';
import Home from './src/screens/Home';
import RecipeDetail from './src/screens/RecipeDetail';

const Stack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={colors.card}
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTintColor: colors.primary,
            title: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetail}
            options={{ headerShown: true, headerTransparent: 1, headerTintColor: 'white' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
