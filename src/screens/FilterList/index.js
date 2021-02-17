/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useSWR from 'swr';
import { coursesCategoryQuery } from '@hooks/useCoursesApiHook';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';
import TextEle from '../../components/TextEle';

const FilterList = ({ route }) => {
  const { where } = route.params;
  const insets = useSafeAreaInsets();
  const { data } = useSWR([coursesCategoryQuery(0, 5, 'updated_at:DESC', where)]);
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const onChangeText = val => {
    setText(val);
  };
  return (
    <KeyboardAvoidingView
      style={{
        paddingTop: insets.top,
      }}>
      <View style={{ paddingTop: 40 }}>
        <SearchBar onChangeText={onChangeText} text={text} />
      </View>
      <ScrollView
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}>
        {data?.courses.map(item => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 5,
            }}>
            <Image
              source={{ uri: item.image.url }}
              style={{ height: 60, width: 60, borderRadius: 5 }}
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
            <TextEle
              variant="body1"
              style={{
                color: colors.text,
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 3,
              }}>
              {item.caption}
            </TextEle>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FilterList;
