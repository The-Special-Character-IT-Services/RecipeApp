<<<<<<< HEAD
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, View, Image, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';
import Data from '../../components/Carousal/data';
import TextEle from '../../components/TextEle';

const Search = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onChangeText = val => {
    setText(val);
  };
  return (
    <KeyboardAvoidingView
      style={{
        paddingTop: insets.top,
      }}>
      <View style={{ paddingTop: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <TextEle variant="title">Search Category</TextEle>
        </View>
        <SearchBar onChangeText={onChangeText} text={text} />
      </View>
      <ScrollView
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}>
        {Data.map(item => (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Image source={item.img} style={{ height: 50, width: 50, borderRadius: 5 }} />
            <TextEle
              variant="body1"
              style={{
                color: colors.text,
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 3,
              }}>
              {item.TextHeading}
            </TextEle>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
=======
import TextEle from '@components/TextEle';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CuisineList = () => (
  <View>
    <TextEle>Filter List</TextEle>
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
      <View></View>
    </ScrollView>
  </View>
);
>>>>>>> 5d42786d7b0da9714f9cc022123afa39ac94ffcb

export default Search;
