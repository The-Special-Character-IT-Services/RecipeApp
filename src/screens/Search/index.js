/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, View, Image, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useSWR from 'swr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import SearchBar from '../../components/Search';
import RecentlyAdd from '../../components/RecentlyAdd';
import SearchCuisine from '../../components/SearchCuisine';
// import Data from '../../components/Carousal/data';
import TextEle from '../../components/TextEle';

const arr = ['Trending', 'Recently Added ', 'Rice Items', 'Sweets', 'Salads'];

const Search = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { data } = useSWR([coursesQuery(0, 5, 'updated_at:DESC')]);
  const [text, setText] = useState('');
  const onChangeText = val => {
    setText(val);
  };
  console.log(data);
  return (
    <KeyboardAvoidingView
      style={{
        paddingTop: insets.top,
      }}>
      <SearchBar onChangeText={onChangeText} text={text} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
        horizontal>
        {arr.map(x => (
          <View
            key={x.id}
            style={{
              paddingHorizontal: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.text,
              marginHorizontal: 5,
              justifyContent: 'center',
              height: 40,
            }}>
            <TextEle>{x}</TextEle>
          </View>
        ))}
      </ScrollView>

      {text <= 0 ? (
        <ScrollView>
          <RecentlyAdd />
          <SearchCuisine />
        </ScrollView>
      ) : (
        <ScrollView
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            flexDirection: 'row',
          }}>
          {data?.courses.map(item => (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
              }}>
              <Image
                source={{ uri: item.image.url }}
                style={{ height: 50, width: 50, borderRadius: 5 }}
              />
              <TextEle
                variant="body1"
                style={{
                  color: colors.text,
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 3,
                }}>
                {item.name}
              </TextEle>
            </View>
          ))}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Search;
