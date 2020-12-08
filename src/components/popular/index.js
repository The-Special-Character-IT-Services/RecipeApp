/* eslint-disable global-require */
import React from 'react';
import { View, Text, ScrollView, ImageBackground, Pressable } from 'react-native';
// import CakeIcon from '../../assets/icons/cake-black.svg';
import HeartIcon from '../../assets/icons/heart-icon.svg';
import TimerIcon from '../../assets/icons/Timer-icon.svg';
import StarIcon from '../../assets/icons/star-icon.svg';

const PicInLoop = [
  {
    id: 1,
    img: require('../../assets/images/FoodPic1.jpg'),
    time: '25`',
    rating: '4.0',
    TextHeading: 'Maxican Salad',
    Description: 'Amazing Combo of different taste',
  },
  {
    id: 2,
    img: require('../../assets/images/Pizza.jpg'),
    time: '30`',
    rating: '4.5',
    TextHeading: 'Italian Pizza',
    Description: 'Amazing taste of original Italian food',
  },
  {
    id: 3,
    img: require('../../assets/images/Sandwich.jpg'),
    time: '15`',
    rating: '4.0',
    TextHeading: 'Sandwich',
    Description: 'Amazing Combo of mayo, salad with liquid cheese',
  },
  {
    id: 4,
    img: require('../../assets/images/Pie.jpg'),
    time: '35`',
    rating: '5.0',
    TextHeading: 'Chocolate Pie',
    Description: 'Amazing Combo of strawberry and soft choco pie',
  },
  {
    id: 5,
    img: require('../../assets/images/Something.jpg'),
    time: '30`',
    rating: '5.0',
    TextHeading: 'Maxican christmas Special',
    Description: 'Amazing Combo of maxican salad and different spices',
  },
];

const index = ({ onRecipePress }) => (
  <View>
    <View>
      <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Popular</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {PicInLoop.map(item => (
          <Pressable
            onPress={onRecipePress}
            key={item.id}
            style={{ marginHorizontal: 10, width: 300 }}>
            <ImageBackground
              style={{ height: 200, width: 300 }}
              imageStyle={{ borderRadius: 20 }}
              source={item.img}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}>
                <HeartIcon height={24} width={24} fill={item.id === 1 ? 'red' : 'white'} />
              </View>
            </ImageBackground>
            <View>
              <Text style={{ paddingTop: 20, paddingBottom: 5 }}>{item.TextHeading}</Text>
              <Text
                style={{ flexWrap: 'wrap', paddingBottom: 10, color: 'gray', fontSize: 12 }}
                numberOfLines={2}>
                {item.Description}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TimerIcon height={24} width={24} fill="black" />
                <Text style={{ marginLeft: 8 }}>{item.time}</Text>
                <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center' }}>
                  <StarIcon height={24} width={24} fill="black" />
                  <Text style={{ marginLeft: 8 }}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  </View>
);

export default index;
