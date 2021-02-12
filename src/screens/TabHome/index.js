/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-expressions */
import React, { useRef, useState } from 'react';
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
import { getToken } from '@utils/index';
import Header from '../Header';

const TabHome = ({ navigation }) => {
  const playerRef = useRef();
  const insets = useSafeAreaInsets();
  const { data } = useSWR([coursesQuery(0, 5, 'updated_at:DESC')]);
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
      <Category onCategoryDetails={() => navigation.navigate('CuisineList')} />
      <HomeList
        title="New Courses"
        newData={data?.courses || []}
        onPressViewAll={() => navigation.navigate('CuisineList')}
        onRecipePress={async item => {
          const {
            user: { id: userId },
          } = await getToken();
          navigation.navigate('CourseDetails', { id: item.id, userId });
        }}
      />
      <Cuisines onCuisinePress={() => navigation.navigate('CuisineList')} />
    </ScrollView>
  );
};

TabHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabHome;
