/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unused-state */
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput, View, ScrollView } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import TextEle from '../TextEle';
import SearchSharp from '../../assets/icons/search-sharp.svg';

const arr = ['Trending', 'Recently Added ', 'Rice Items', 'Sweets', 'Salads'];

const Search = () => {
  const [text, setText] = useState('');
  const { colors } = useTheme();
  const onchangeText = val => {
    setText(val);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', margin: 20 }}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={colors.text}
          style={{
            flex: 1,
            fontSize: 18,
            color: colors.text,
            borderColor: colors.text,
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
          value={text}
          onChangeText={onchangeText}
        />
        <SearchSharp
          height={24}
          width={24}
          fill={colors.text}
          style={{ position: 'absolute', top: 7, right: 10 }}
        />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        horizontal>
        {arr.map(x => (
          <View
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
    </View>
  );
};
export default Search;
