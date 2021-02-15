/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-expressions */
import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import useSWR from 'swr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '@components/Category';
import SearchBar from '@components/Search';
import Cuisines from '@components/Cuisines';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import HomeList from '@components/HomeList';
import { UserContext } from '@context/userContext';
import Header from '../Header';

const TabHome = ({ navigation }) => {
  const playerRef = useRef();
  const insets = useSafeAreaInsets();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery({
      pageIndex: 0,
      limit: 5,
      sort: 'updated_at:DESC',
      userId: user?.id,
    }),
  ]);

  const [text, setText] = useState('');
  const onchangeText = val => {
    setText(val);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Header onProfilePress={() => navigation.navigate('Profile')} />
      <Pressable ref={playerRef} onPress={() => navigation.navigate('Search')}>
        <SearchBar
          editable={false}
          selectTextOnFocus={false}
          onchangeText={onchangeText}
          value={text}
        />
      </Pressable>
      <Category
        onCategoryDetails={() => navigation.navigate('CuisineList', { name: 'Search Category' })}
      />
      <HomeList
        title="New Courses"
        newData={data?.courses || []}
        onPressViewAll={() => navigation.navigate('CuisineList', { name: 'All Courses' })}
        onRecipePress={async item => {
          navigation.navigate('CourseDetails', { id: item.id, userId: user.id });
        }}
      />
      <Cuisines
        onCuisinePress={() => navigation.navigate('CuisineList', { name: 'Search Cuisine' })}
      />
    </ScrollView>
  );
};

TabHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabHome;
