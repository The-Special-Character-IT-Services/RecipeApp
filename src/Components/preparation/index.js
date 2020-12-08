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
      text: '1. Melt chocolate',
      img: require('../../assets/image/choco.png'),
    },
    {
      id: 2,
      text: '2. Squeeze juice',
      img: require('../../assets/image/lemon.png'),
    },
    {
      id: 3,
      text: '3. South Indian',
      img: require('../../assets/image/dosa.png'),
    },
    {
      id: 4,
      text: '4. Pizzas',
      img: require('../../assets/image/pizza.png'),
    },
    {
      id: 5,
      text: '5. Birthday cakes',
      img: require('../../assets/image/cakes.png'),
    },
  ];

  return (
    <View>
      <View style={{ marginHorizontal: 30, marginTop: 20 }}>
        <Text style={{ fontSize: 26 }}>Very Berry Tart</Text>
        <Text numberOfLines={2} style={{ color: 'gray' }}>
          Amazing combo of sweet and sour taste! Super easy to cook.Enjoy!
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
              marginVertical: 20,
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
    </View>
  );
};

export default index;
