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
      <Category />
      <HomeList
        title="New Courses"
        data={data?.courses || []}
        onRecipePress={item => navigation.navigate('CourseDetails', { item })}
      />
      {/* <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <TextEle variant="body1" style={{ fontSize: 20, fontWeight: 'bold' }}>
          New Videos
        </TextEle>
      </View>
      <Popular
        onRecipePress={item => {
          item.id === 3 || item.id === 2
            ? navigation.navigate('PriceTag')
            : navigation.navigate('RecipeDetail', item);
        }}
      /> */}
      {/* <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <TextEle variant="body1" style={{ fontSize: 20, fontWeight: 'bold' }}>
          Popular
        </TextEle>
      </View>
      <Popular
        onRecipePress={item => {
          item.id === 3 || item.id === 2
            ? navigation.navigate('PriceTag')
            : navigation.navigate('RecipeDetail', item);
        }}
      /> */}
      {/* <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <TextEle variant="body1" style={{ fontSize: 20, fontWeight: 'bold' }}>
          UpComing Events
        </TextEle>
      </View>
      <UpComingEvent /> */}
      <Cuisines />
    </ScrollView>
  );
};

TabHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabHome;
