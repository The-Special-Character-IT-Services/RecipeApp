import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import TabHome from '../TabHome';
import TabSearch from '../TabSearch';
import TabLikes from '../TabLikes';
// import TabProfile from '../TabProfile';
import TabEvent from '../TabEvent';
import HeartOutline from '../../assets/icons/heart-outline.svg';
import HeartSharp from '../../assets/icons/heart-sharp.svg';
import HomeOutline from '../../assets/icons/home-outline.svg';
import HomeSharp from '../../assets/icons/home-sharp.svg';
// import PersonOutline from '../../assets/icons/person-outline.svg';
// import Personsharp from '../../assets/icons/person-sharp.svg';
import SearchOutline from '../../assets/icons/search-outline.svg';
import SearchSharp from '../../assets/icons/search-sharp.svg';
import EventOutline from '../../assets/icons/event1-outline.svg';
import EventSharp from '../../assets/icons/event1-sharp.svg';

const Tab = createBottomTabNavigator();

const Home = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
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
              return <EventOutline height={24} width={24} fill={color} />;

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
    </Tab.Navigator>
  );
};

export default Home;
