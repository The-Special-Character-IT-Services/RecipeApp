import React from 'react';
import { View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TextEle from '../TextEle';
import data from './data';

const LikedRecipe = () => (
  <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
      <TextEle
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          flex: 1,
          marginVertical: 15,
        }}>
        Liked Recipes
      </TextEle>
      <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }} />
    </View>
    <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
      {data.map(item => (
        <View key={item.id} style={{ flexDirection: 'row', marginVertical: 5, height: 100 }}>
          <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={item.img} />
          <View
            style={{
              flex: 1,
              paddingLeft: 15,
              justifyContent: 'center',
            }}>
            <TextEle style={{ fontWeight: 'bold', fontSize: 17 }}>{item.text}</TextEle>
            <TextEle style={{ color: 'gray' }}>{item.amount}</TextEle>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

export default LikedRecipe;
