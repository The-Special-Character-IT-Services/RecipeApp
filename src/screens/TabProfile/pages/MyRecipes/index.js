import {} from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import data from '../../../../components/Preparation/data';
import TextEle from '../../../../components/TextEle';

const MyRecipes = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
        key={item.id}>
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          source={item.img}
          style={{
            height: 230,
            width: 150,
            borderRadius: 500,
          }}>
          <TextEle variant="caption" style={{ color: 'white', paddingLeft: 10, paddingTop: 5 }}>
            {item.text}
          </TextEle>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'baseline',
              flexWrap: 'wrap-reverse',
            }}>
            <TextEle variant="body2">{item.rating}</TextEle>
          </View>
        </ImageBackground>
      </View>
    )}
    numColumns={2}>
    <View style={{ flexDirection: 'column' }} />
  </FlatList>
);

export default MyRecipes;
