import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import TabHome from '../TabHome';
import TabSearch from '../TabSearch';
import TabLikes from '../TabLikes';
import TabShopPage from '../TabShop';
import TabEvent from '../TabEvent';
import HeartOutline from '../../assets/icons/heart-outline.svg';
import HeartSharp from '../../assets/icons/heart-sharp.svg';
import HomeOutline from '../../assets/icons/home-outline.svg';
import HomeSharp from '../../assets/icons/home-sharp.svg';
import SearchOutline from '../../assets/icons/search-outline.svg';
import SearchSharp from '../../assets/icons/search-sharp.svg';
import EventOutline from '../../assets/icons/calendar-outline.svg';
import EventSharp from '../../assets/icons/calendar.svg';
import ShopSharp from '../../assets/icons/cart-sharp.svg';
import ShopOutline from '../../assets/icons/cart-outline.svg';
import CartButton from '../CartButton';
import CartScreen from '../CartScreen';

const Tab = createBottomTabNavigator();
const TabShopStack = createStackNavigator();

const TabShop = () => {
  const { colors } = useTheme();

  return (
    <TabShopStack.Navigator>
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

const Home = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      lazy
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused, color }) => {
          console.log(color);
          switch (route.name) {
            case 'TabHome':
              if (focused) {
                return <HomeSharp height={24} width={24} fill={color} />;
              }
              return <HomeOutline height={24} width={24} stroke={color} />;

            case 'TabSearch':
              if (focused) {
                return <SearchSharp height={24} width={24} fill={color} />;
              }
              return <SearchOutline height={24} width={24} stroke={color} />;
            case 'TabLikes':
              if (focused) {
                return <HeartSharp height={24} width={24} fill={color} />;
              }
              return <HeartOutline height={24} width={24} stroke={color} />;

            case 'TabEvent':
              if (focused) {
                return <EventSharp height={24} width={24} fill={color} />;
              }
              return <EventOutline height={24} width={24} stroke={color} />;

            case 'TabShop':
              if (focused) {
                return <ShopSharp height={24} width={24} fill={color} />;
              }
              return <ShopOutline height={24} width={24} stroke={color} />;

            default:
              return null;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        showLabel: false,
      }}>
      <Tab.Screen name="TabHome" component={TabHome} />
      <Tab.Screen name="TabSearch" component={TabSearch} />
      <Tab.Screen name="TabLikes" component={TabLikes} />
      {/* <Tab.Screen name="TabProfile" component={TabProfile} /> */}
      <Tab.Screen name="TabEvent" component={TabEvent} />
      <Tab.Screen name="TabShop" component={TabShop} />
      {/* <Tab.Screen name="CartScreen" component={CartScreen} /> */}
    </Tab.Navigator>
  );
};
TabShop.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default Home;
