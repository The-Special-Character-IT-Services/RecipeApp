import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';
import Footer from '../../components/Footer';
import Popular from '../../components/Popular';

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
        <Popular />
        <Footer />
      </ScrollView>
    </View>
  );
};

export default TabSearch;
