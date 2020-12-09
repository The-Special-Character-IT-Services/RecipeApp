import React from 'react';
import { ScrollView } from 'react-native';
import Category from '../../components/Category';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Popular from '../../components/Popular';

const index = ({ navigation }) => (
  <ScrollView
    style={{ flex: 1 }}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 20 }}>
    <Header />
    <Category />
    <Popular
      onRecipePress={item => {
        navigation.navigate('RecipeDetail', item);
      }}
    />
    <Footer />
  </ScrollView>
);

export default index;
