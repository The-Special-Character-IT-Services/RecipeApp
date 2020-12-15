import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View } from 'react-native';
import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Registration from './src/screens/Registration';
import Home from './src/screens/Home';
import RecipeDetail from './src/screens/RecipeDetail';
import LikeButton from './src/components/LikeButton';
import RecipeVideo from './src/screens/RecipeVideo';
import ShareButton from './src/components/ShareButton';

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

const Stack = createStackNavigator();

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
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTintColor: currentTheme.colors.primary,
            title: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RecipeVideo" component={RecipeVideo} />
          <Stack.Screen
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
              headerTintColor: currentTheme.colors.primary,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
