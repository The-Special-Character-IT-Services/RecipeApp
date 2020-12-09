import React from 'react';
import { View } from 'react-native';
import SearchBar from '../../components/Search';
import Footer from '../../components/Footer';
import Popular from '../../components/Popular';

const index = () => (
  <View>
    <SearchBar />

    <Popular />
    <Footer />
  </View>
);

export default index;
