/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unused-state */
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput, View, ScrollView } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import TextEle from '../TextEle';

const arr = ['Trending', 'Rice Items', 'Sweets'];

const Search = () => {
  const [text, setText] = useState('');
  const { colors } = useTheme();
  const onchangeText = val => {
    setText(val);
  };

  return (
    <View>
      <TextInput
        placeholder="Search here"
        placeholderTextColor={colors.text}
        style={{
          color: colors.text,
          borderColor: colors.text,
          borderWidth: 1,
          borderRadius: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          margin: 20,
        }}
        value={text}
        onChangeText={onchangeText}
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }} horizontal>
        {arr.map(x => (
          <View
            style={{
              paddingHorizontal: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.text,
              marginHorizontal: 5,
              justifyContent: 'center',
              height: 50,
            }}>
            <TextEle>{x}</TextEle>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Search;
