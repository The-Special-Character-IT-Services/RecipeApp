import React from 'react';
import { View } from 'react-native';
import SearchBar from '../../components/Search';
import Footer from '../../components/Footer';
import Offers from '../../components/Offers';

const index = () => (
  <View>
    <SearchBar />
    <Offers />
    <Footer />
  </View>
);

export default index;
