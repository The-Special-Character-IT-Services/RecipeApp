/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '../../components/Category';
import Header from '../Header';
import Footer from '../../components/Footer';
import Popular from '../../components/Carousal';
import TextEle from '../../components/TextEle';

const TabHome = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Header onProfilePress={() => navigation.navigate('Profile')} />
      <Category />
      <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <TextEle variant="body1" style={{ fontSize: 20, fontWeight: 'bold' }}>
          New Videos
        </TextEle>
      </View>
      <Popular
        onRecipePress={item => {
          item.id === 3 || item.id === 2
            ? navigation.navigate('PriceTag')
            : navigation.navigate('RecipeDetail', item);
        }}
      />
      <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <TextEle variant="body1" style={{ fontSize: 20, fontWeight: 'bold' }}>
          Popular
        </TextEle>
      </View>
      <Popular
        onRecipePress={item => {
          item.id === 3 || item.id === 2
            ? navigation.navigate('PriceTag')
            : navigation.navigate('RecipeDetail', item);
        }}
      />
      <Footer />
    </ScrollView>
  );
};

TabHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabHome;
