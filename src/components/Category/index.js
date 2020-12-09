/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import Breakfast from '../../assets/icons/PicBreakfast.svg';
import Lunch from '../../assets/icons/PicLunch.svg';
import Dinner from '../../assets/icons/PicDinner.svg';
import Dessert from '../../assets/icons/PicDessert.svg';
import Beverage from '../../assets/icons/PicBeverage.svg';
import Starter from '../../assets/icons/PicStarter.svg';
import Fastfood from '../../assets/icons/PicFastFood.svg';
import TextEle from '../TextEle';

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

const Category = () => {
  const { colors } = useTheme();
  return (
    <View>
      <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
        <TextEle style={{ fontWeight: 'bold', paddingLeft: 10 }}>Select a category</TextEle>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {PicCategory.map(item => (
          <View key={item.id} style={{ marginHorizontal: 5, alignItems: 'center' }}>
            <View
              style={{
                marginHorizontal: 5,
                height: 50,
                borderRadius: 12,
                width: 50,
                marginVertical: 10,
                backgroundColor: item.id === 1 ? colors.primary : colors.card,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: colors.text,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}>
              {item.icon(item.id === 1 ? colors.card : colors.primary)}
            </View>
            <View>
              <TextEle>{item.text}</TextEle>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;
