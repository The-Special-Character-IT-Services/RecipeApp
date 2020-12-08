/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Breakfast from '../../assets/icons/PicBreakfast.svg';
import Lunch from '../../assets/icons/PicLunch.svg';
import Dinner from '../../assets/icons/PicDinner.svg';
import Dessert from '../../assets/icons/PicDessert.svg';
import Beverage from '../../assets/icons/PicBeverage.svg';
import Starter from '../../assets/icons/PicStarter.svg';
import Fastfood from '../../assets/icons/PicFastFood.svg';

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

const PicCategory = [
  {
    id: 1,
    icon: fill => <Breakfast height={24} width={24} fill={fill} />,
    text: 'Breakfast',
  },

  {
    id: 2,
    icon: () => <Lunch height={24} width={24} />,
    text: 'Lunch',
  },

  {
    id: 3,
    icon: fill => <Dinner height={24} width={24} fill={fill} />,
    text: 'Dinner',
  },

  {
    id: 4,
    icon: () => <Dessert height={24} width={24} />,
    text: 'Dessert',
  },

  {
    id: 5,
    icon: fill => <Beverage height={24} width={24} fill={fill} />,
    text: 'Beverage',
  },

  {
    id: 6,
    icon: () => <Starter height={24} width={24} />,
    text: 'Starter',
  },

  {
    id: 7,
    icon: () => <Fastfood height={24} width={24} />,
    text: 'Fastfood',
  },
];

const index = () => (
  <View>
    <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 30, marginTop: 20 }}>
        Hello there,
        <Text style={{ color: 'rgb(200, 60, 50)', fontWeight: 'bold' }}> Ana!</Text>
      </Text>
      <Image
        style={{ marginLeft: 30, height: 80, width: 80, borderRadius: 10 }}
        source={require('../../assets/images/profilelogo.png')}
      />
    </View>

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
              backgroundColor: item.id === 1 ? 'orange' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item.icon(item.id === 1 ? '#fff' : 'black')}
          </View>
          <View>
            <Text style={{ fontSize: 10, color: 'black' }}>{item.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
    <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
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
    {/* <TouchableHighlight
      style={{
        marginHorizontal: 40,
        marginVertical: 20,
        borderRadius: 20,
      }}
      onPress={() => {}}>
      <View
        style={{
          height: 40,
          borderRadius: 20,
          backgroundColor: 'orange',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
      </View>
    </TouchableHighlight> */}
    {/* <Pressable
      onPress={() => alert('hi')}
      style={{
        marginHorizontal: 40,
        marginVertical: 20,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'orange',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CakeIcon height={24} width={24} fill="#fff" />
      <Text style={{ color: '#fff', paddingLeft: 10 }}>Watch Video</Text>
    </Pressable> */}
  </View>
);

export default index;
