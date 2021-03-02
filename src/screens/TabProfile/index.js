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
import Loading from '@components/loading';

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

  const purchasedCourseCount = data?.courses?.reduce((p, c) => p + c.purchase_details?.length, 0);
  const likedCourseCount = data?.courses?.reduce((p, c) => p + c.like_event?.length, 0);

  if (!likedCourseCount && !purchasedCourseCount) {
    return <Loading />;
  }

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
            paddingHorizontal: 25,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: colors.card,
              borderRadius: 25,
              height: 100,
              marginVertical: 20,
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TextEle variant="header2" style={{ color: colors.text }}>
                {purchasedCourseCount}
              </TextEle>
              <TextEle variant="body2" style={{ color: colors.text }}>
                Courses
              </TextEle>
            </View>
            <View style={{ height: 50, width: 1, backgroundColor: 'gray' }} />
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TextEle variant="header2" style={{ color: colors.text }}>
                {likedCourseCount && likedCourseCount - 1}
              </TextEle>
              <TextEle variant="body2" style={{ color: colors.text }}>
                Likes
              </TextEle>
            </View>
            <View style={{ height: 50, width: 1, backgroundColor: 'gray' }} />
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TextEle variant="header2" style={{ color: colors.text }}>
                0
              </TextEle>
              <TextEle variant="body2" style={{ color: colors.text }}>
                Saves
              </TextEle>
            </View>
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
