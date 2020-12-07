import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabHome from '../TabHome';
import TabSearch from '../TabSearch';
import TabLikes from '../TabLikes';
import TabProfile from '../TabProfile';

const Tab = createBottomTabNavigator();

const index = () => (
  <Tab.Navigator>
    <Tab.Screen name="TabHome" component={TabHome} />
    <Tab.Screen name="TabSearch" component={TabSearch} />
    <Tab.Screen name="TabLikes" component={TabLikes} />
    <Tab.Screen name="TabProfile" component={TabProfile} />
  </Tab.Navigator>
);

export default index;
