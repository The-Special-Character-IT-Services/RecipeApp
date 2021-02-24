import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import TextEle from '@components/TextEle';
import { UserContext } from '@context/userContext';
import useSWR from 'swr';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import MyRecipes from './pages/MyRecipes';
import Settings from './pages/Settings';
import SavedVideos from './pages/SavedVideos';
import { lastItem } from 'country-codes-list/countriesData';

const { width: windowWidth } = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();

// const data = [
//   {
//     text: 'Liked',
//     value: 12,
//   },
//   {
//     text: 'Saves',
//     value: 0,
//   },
// ];

const Profile = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery({ pageIndex: 0, limit: 5, sort: 'updated_at:ASC', userId: user?.id }),
  ]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
          height: 140,
          backgroundColor: colors.background,
          zIndex: 1,
        }}>
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
              marginVertical: 20,
            }}>
            {data?.courses?.map((x, i) => (
              <>
                {i !== 0 && i !== 3 && (
                  <View key={x.id} style={{ height: 40, width: 1, backgroundColor: 'gray' }} />
                )}
                <View
                  key={x.text}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <TextEle variant="header2" style={{ color: colors.text }}>
                    {i === 0 && x?.purchase_details?.length}
                    {i === 1 && x?.like_event?.length}
                    {i === 2 && 0}
                  </TextEle>
                  <TextEle variant="body2" style={{ color: colors.text }}>
                    {i === 0 && 'Courses'}
                    {i === 1 && 'liked'}
                    {i === 2 && 'Saved'}
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
          removeClippedSubviews
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.text,
            indicatorStyle: {
              height: 5,
              width: 5,
              borderRadius: 2,
              marginBottom: 5,
              borderBottomWidth: 0,
              alignSelf: 'center',
              left: windowWidth / 3 / 2 - 2,
            },
            style: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomWidth: 0,
              borderTopWidth: 0,
              borderBottomColor: 'transparent',
              elevation: 0,
              shadowColor: '#5bc4ff',
              shadowOpacity: 0,
              shadowOffset: {
                height: 0,
              },
              shadowRadius: 0,
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
            name="SavedVideos"
            component={SavedVideos}
            options={{
              title: 'Saved Videos',
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

export default Profile;
