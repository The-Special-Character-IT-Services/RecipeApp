import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { View } from 'react-native';
import TabHome from '../TabHome';
import TabLikes from '../TabLikes';
import TabShopPage from '../TabShop';
import TabEvent from '../TabEvent';
import CartButton from '../CartButton';
import CartScreen from '../CartScreen';
import YoutubeScreen from '../TabYoutube';

const Tab = createBottomTabNavigator();

const TabShopStack = createStackNavigator();

const TabShop = () => {
  const { colors } = useTheme();

  return (
    <TabShopStack.Navigator detachInactiveScreens>
      <TabShopStack.Screen
        name="TabShopPage"
        component={TabShopPage}
        options={({ navigation }) => ({
          title: 'Order Now',
          headerShown: true,
          headerLeft: false,
          headerTitleAlign: 'center',
          headerTintColor: colors.primary,
          headerRight: () => (
            <View>
              <CartButton onCartPress={() => navigation.navigate('CartScreen')} />
            </View>
          ),
        })}
      />
      <TabShopStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerTintColor: colors.primary }}
      />
    </TabShopStack.Navigator>
  );
};

const YoutubeStack = createStackNavigator();

const TabYoutube = () => {
  const { colors } = useTheme();

  return (
    <YoutubeStack.Navigator>
      <YoutubeStack.Screen
        name="TabShopPage"
        component={YoutubeScreen}
        options={({ navigation }) => ({
          title: 'Recipes',
          headerShown: true,
          headerLeft: false,
          headerTitleAlign: 'center',
          headerTintColor: colors.primary,
          headerRight: () => (
            <BorderlessButton
              style={{ marginHorizontal: 10 }}
              onPress={() => navigation.navigate('YoutubeFilter')}>
              <Icon name="filter" size={24} color={colors.text} />
            </BorderlessButton>
          ),
        })}
      />
    </YoutubeStack.Navigator>
  );
};

const Home = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'TabHome':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'TabLikes':
              iconName = focused ? 'heart' : 'ios-heart-outline';
              break;

            case 'TabEvent':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;

            case 'TabShop':
              iconName = focused ? 'cart' : 'cart-outline';
              break;

            case 'TabYoutube':
              iconName = 'logo-youtube';
              break;

            default:
              return null;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        showLabel: false,
      }}>
      <Tab.Screen name="TabHome" component={TabHome} />
      <Tab.Screen name="TabEvent" component={TabEvent} />
      <Tab.Screen name="TabYoutube" component={TabYoutube} />
      <Tab.Screen name="TabLikes" component={TabLikes} />
      <Tab.Screen name="TabShop" component={TabShop} />
    </Tab.Navigator>
  );
};
TabShop.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default Home;
