import TextEle from '@components/TextEle';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CuisineList = () => (
  <View>
    <TextEle>Filter List</TextEle>
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
      <View></View>
    </ScrollView>
  </View>
);

export default CuisineList;
