import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Timer from '../../assets/icons/timer-black.svg';
import TextEle from '../TextEle';

const LikedRecipe = () => {
  const { colors } = useTheme();
  const photos = [
    {
      id: 1,
      img: require('../../assets/images/FoodPic1.jpg'),
      text: 'Maxican Salad',
      amount: 'Amazing Combo of different taste',
    },
    {
      id: 2,
      img: require('../../assets/images/Pizza.jpg'),
      text: 'Italian Pizza',
      amount: 'Amazing taste of original Italian food',
    },
    {
      id: 3,
      img: require('../../assets/images/Sandwich.jpg'),
      text: 'Sandwich',
      amount: 'Amazing Combo of mayo, salad with liquid cheese',
    },
    {
      id: 4,
      img: require('../../assets/images/Pie.jpg'),
      text: 'Chocolate Pie',
      amount: 'Amazing Combo of strawberry and soft choco pie',
    },
    {
      id: 5,
      img: require('../../assets/images/Something.jpg'),
      text: 'Maxican christmas Special',
      amount: 'Amazing Combo of maxican salad and different spices',
    },
  ];
  return (
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
        <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Timer height={24} width={24} fill={colors.text} />
          <TextEle style={{ marginLeft: 8, fontSize: 17 }}>35`</TextEle>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {photos.map(item => (
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
};

export default LikedRecipe;
