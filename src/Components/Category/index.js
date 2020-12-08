/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Breakfast from '../../assets/icons/PicBreakfast.svg';
import Lunch from '../../assets/icons/PicLunch.svg';
import Dinner from '../../assets/icons/PicDinner.svg';
import Dessert from '../../assets/icons/PicDessert.svg';
import Beverage from '../../assets/icons/PicBeverage.svg';
import Starter from '../../assets/icons/PicStarter.svg';
import Fastfood from '../../assets/icons/PicFastFood.svg';

const PicCategory = [
  {
    id: 1,
    icon: fill => <Breakfast height={24} width={24} fill={fill} />,
    text: 'Breakfast',
  },

  {
    id: 2,
    icon: fill => <Lunch height={24} width={24} fill={fill} />,
    text: 'Lunch',
  },

  {
    id: 3,
    icon: fill => <Dinner height={24} width={24} fill={fill} />,
    text: 'Dinner',
  },

  {
    id: 4,
    icon: fill => <Dessert height={24} width={24} fill={fill} />,
    text: 'Dessert',
  },

  {
    id: 5,
    icon: fill => <Beverage height={24} width={24} fill={fill} />,
    text: 'Beverage',
  },

  {
    id: 6,
    icon: fill => <Starter height={24} width={24} fill={fill} />,
    text: 'Starter',
  },

  {
    id: 7,
    icon: fill => <Fastfood height={24} width={24} fill={fill} />,
    text: 'Fastfood',
  },
];

const index = () => (
  <View>
    <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10 }}>
      <Text style={{ fontWeight: 'bold', color: 'gray', paddingLeft: 10 }}>Select a category</Text>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}>
      {PicCategory.map(item => (
        <View key={item.id} style={{ marginHorizontal: 5, alignItems: 'center' }}>
          <View
            style={{
              marginHorizontal: 5,
              height: 50,
              borderRadius: 12,
              width: 50,
              marginVertical: 10,
              backgroundColor: item.id === 1 ? 'orange' : 'rgb(242,242,242)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item.icon(item.id === 1 ? 'rgb(242,242,242)' : 'gray')}
          </View>
          <View>
            <Text style={{ fontSize: 10, color: 'black' }}>{item.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

export default index;
