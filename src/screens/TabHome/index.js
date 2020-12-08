import React from 'react';
import { View } from 'react-native';
import Category from '../../components/Category';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Popular from '../../components/popular';

const index = () => (
  <View>
    <Header />
    <Category />
    <Popular />
    <Footer />
  </View>
);

export default index;
