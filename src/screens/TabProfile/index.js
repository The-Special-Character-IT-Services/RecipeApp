import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import TextEle from '../../components/TextEle';
import MyRecipes from './pages/MyRecipes';
import Settings from './pages/Settings';
import Followers from './pages/Followers';

const { height: windowHeight } = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();

const data = [
  {
    text: 'Recipes',
    value: 43,
  },
  {
    text: 'Liked',
    value: 12,
  },
  {
    text: 'Saves',
    value: 10,
  },
];

const TabProfile = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View
        style={{
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
          height: windowHeight * 0.3,
          backgroundColor: colors.background,
          zIndex: 1,
        }}>
        <Header />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 25,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: colors.card,
              borderRadius: 25,
              height: 100,
            }}>
            {data.map((x, i) => (
              <>
                {i !== 0 && <View style={{ height: 40, width: 1, backgroundColor: 'gray' }} />}
                <View
                  key={x.text}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <TextEle variant="header2">{x.value}</TextEle>
                  <TextEle variant="body2" style={{ color: colors.text }}>
                    {x.text}
                  </TextEle>
                </View>
              </>
            ))}
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.card,
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.text,
            indicatorStyle: {
              width: 5,
              height: 5,
              backgroundColor: colors.primary,
              borderRadius: 2,
              marginLeft: 62,
              marginBottom: 5,
            },
            tabStyle: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
            },
          }}>
          <Tab.Screen
            name="MyRecipes"
            component={MyRecipes}
            options={{
              title: 'My Recipes',
            }}
          />
          <Tab.Screen
            name="Followers"
            component={Followers}
            options={{
              title: 'Followers',
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default TabProfile;
