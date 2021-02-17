import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SearchBar from '../../components/Search';
import LikedRecipe from '../../components/LikedRecipe';

const TabLikes = ({ navigation }) => {
  const [text, setText] = useState('');

  const onChangeText = val => {
    setText(val);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onChangeText={onChangeText} value={text} clearText={() => setText('')} />
      <LikedRecipe
        onRecipeDetail={item => {
          navigation.navigate('RecipeDetail', item);
        }}
      />
    </View>
  );
};

TabLikes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabLikes;
