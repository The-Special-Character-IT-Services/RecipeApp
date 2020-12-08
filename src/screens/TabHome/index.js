import React from 'react';
import { ScrollView } from 'react-native';
import Category from '../../components/Category';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Popular from '../../components/popular';

const index = () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
    <Header />
    <Category />
    <Popular />
    <Footer />
  </ScrollView>
);

export default index;
