import React from 'react';
import { View } from 'react-native';
import Preparation from '../../../../components/Preparation';

const index = ({ navigation }) => (
  <View>
    <Preparation
      onWatchVideoPress={() => {
        navigation.navigate('RecipeVideo');
      }}
    />
  </View>
);

export default index;
