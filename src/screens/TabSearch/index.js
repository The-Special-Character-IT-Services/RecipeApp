import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';
import RecentlyAdd from '../../components/RecentlyAdd';
import SearchCuisine from '../../components/SearchCuisine';

const TabSearch = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}>
      <SearchBar />
      <ScrollView style={{ flex: 1 }}>
        <RecentlyAdd />
        <SearchCuisine />
      </ScrollView>
    </View>
  );
};

export default TabSearch;
