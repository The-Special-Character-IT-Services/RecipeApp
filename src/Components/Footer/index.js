/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PicCuisine = [
  {
    id: 1,
    img1: require('../../assets/images/IndianFood.png'),
    text: 'Indian',
  },

  {
    id: 2,
    img1: require('../../assets/images/ChineseFood.png'),
    text: 'Chinese',
  },

  {
    id: 3,
    img1: require('../../assets/images/ItalianFood.png'),
    text: 'Italian',
  },

  {
    id: 4,
    img1: require('../../assets/images/SouthindianFood.png'),
    text: 'South Indian',
  },

  {
    id: 5,
    img1: require('../../assets/images/MaxicanFood.png'),
    text: 'Maxican',
  },

  {
    id: 6,
    img1: require('../../assets/images/ThaiFood.png'),
    text: 'Thai',
  },

  {
    id: 7,
    img1: require('../../assets/images/ContinentalFood.png'),
    text: 'Continental',
  },
];

const index = () => (
  <View>
    <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>Search by Cuisine</Text>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}>
      {PicCuisine.map(item => (
        <View
          key={item.id}
          style={{ marginVertical: 5, marginHorizontal: 5, alignItems: 'center' }}>
          <Image
            style={{
              borderRadius: 5,
              height: 70,
              width: 70,
            }}
            source={item.img1}
          />
          <Text style={{ fontSize: 13, marginTop: 5, color: 'black' }}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

export default index;
