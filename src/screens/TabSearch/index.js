import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';
import RecentlyAdd from '../../components/RecentlyAdd';
import SearchCuisine from '../../components/SearchCuisine';
import Data from '../../components/RecentlyAdd/data';

const TabSearch = () => {
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
        <View style={{ flexDirection: 'column' }}>
          {Data.map(item => (
            <View>
              <Text style={{ color: 'white', flexDirection: 'column' }}>{item.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default TabSearch;
