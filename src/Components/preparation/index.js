/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View, Text, ScrollView, ImageBackground, Pressable } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import Timer from '../../assets/icons/timer.svg';
import Play from '../../assets/icons/play.svg';

const index = () => {
  const Loopfood = [
    {
      id: 1,
      text: '1. 5 ounces mixed spring greens',
      img: require('../../assets/image/green.png'),
    },
    {
      id: 2,
      text: '2. 1 ripe avocado',
      img: require('../../assets/image/avocado.png'),
    },
    {
      id: 3,
      text: '3. half a small red onion',
      img: require('../../assets/image/onions.png'),
    },
    {
      id: 4,
      text: '4. 1 cup halved cherry tomatoes',
      img: require('../../assets/image/tomatoes.png'),
    },
    {
      id: 5,
      text: '5. 2/3 cup roughly-chopped fresh cilantro.',
      img: require('../../assets/image/chopped.png'),
    },
    {
      id: 6,
      text: '6. 1/3 cup pepitas',
      img: require('../../assets/image/papita.png'),
    },
    {
      id: 7,
      text: '7. optional: 1/2 cup crumbled queso fresco or cotija cheese.',
      img: require('../../assets/image/cheese.png'),
    },
  ];

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 30, marginTop: 20 }}>
        <Text style={{ fontSize: 26 }}>Maxican Salad</Text>
        <Text numberOfLines={2} style={{ color: 'gray' }}>
          Get ready for a healthy and tasty tour of Maxican Salad
        </Text>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{ fontSize: 20, paddingHorizontal: 30, marginVertical: 10, fontWeight: 'bold' }}>
            Preparation
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1 }}>
            <Timer height={24} width={24} fill="black" />
            <Text style={{ alignItems: 'center', paddingRight: 20 }}> 35` </Text>
          </View>
        </View>
        <View style={{ borderRadius: 9, flexDirection: 'column' }}>
          <ScrollView
            style={{ marginBottom: 10 }}
            contentContainerStyle={{ paddingHorizontal: 27 }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {Loopfood.map(item => (
              <View
                style={{ flexDirection: 'row', paddingHorizontal: 5, paddingTop: 10 }}
                key={item.id}>
                <ImageBackground
                  imageStyle={{ borderRadius: 15 }}
                  source={item.img}
                  style={{
                    height: 230,
                    width: 150,
                    borderRadius: 500,
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, paddingLeft: 10, paddingTop: 5 }}>
                    {item.text}
                  </Text>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
          <Pressable
            // eslint-disable-next-line no-alert
            onPress={() => alert('hi')}
            style={{
              marginHorizontal: 40,
              marginVertical: 50,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#FD6D3B',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Play height={24} width={24} fill="white" />
            <Text style={{ color: 'white' }}>Watch Video</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
