/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';
import RecentlyAdd from '../../components/RecentlyAdd';
import SearchCuisine from '../../components/SearchCuisine';
import Data from '../../components/Carousal/data';
import TextEle from '../../components/TextEle';

const TabSearch = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onchangeText = val => {
    setText(val);
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}>
      <SearchBar onchangeText={onchangeText} text={text} />
      {text <= 0 ? (
        <ScrollView style={{ flex: 1 }}>
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
      )}
    </View>
  );
};

export default TabSearch;
