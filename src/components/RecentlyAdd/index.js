/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import SearchSharp from '../../assets/icons/search-sharp.svg';

import TextEle from '../TextEle';

const ListAdd = [
  {
    id: 1,
    text: 'Maxican Salad',
  },

  {
    id: 2,
    text: 'Chocolate Pie',
  },

  {
    id: 3,
    text: 'Maxican christmas Special',
  },
];

const RecentltyAdd = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <View style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 15 }}>
        <TextEle variant="body2" style={{ paddingTop: 20, fontWeight: 'bold' }}>
          Recentlty Searched
        </TextEle>
      </View>
      <ScrollView verticle showsHorizontalScrollIndicator={false}>
        {ListAdd.map(item => (
          <View
            key={item.id}
            style={{
              marginHorizontal: 5,
              alignItems: 'flex-start',
              borderBottomWidth: 0.5,
              borderRadius: 5,
              paddingHorizontal: 10,

              borderColor: colors.text,
              paddingVertical: 5,
            }}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <SearchSharp
                  height={24}
                  width={24}
                  fill={colors.text}
                  style={{ position: 'absolute', left: 0, top: 5 }}
                />
                <TextEle
                  variant="body1"
                  style={{ color: colors.text, marginVertical: 3, margin: 30 }}>
                  {item.text}
                </TextEle>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentltyAdd;
