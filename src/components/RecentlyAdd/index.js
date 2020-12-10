/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

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
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 15 }}>
        <TextEle variant="body2" style={{ paddingTop: 20, fontWeight: 'bold', paddingLeft: 10 }}>
          Recentlty Added
        </TextEle>
      </View>
      <ScrollView
        verticle
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {ListAdd.map(item => (
          <View
            key={item.id}
            style={{
              marginHorizontal: 5,
              alignItems: 'flex-start',
              borderWidth: 2,
              borderRadius: 5,
              paddingHorizontal: 10,

              borderColor: colors.text,
              paddingVertical: 5,
            }}>
            <View>
              <TextEle variant="body1" style={{ color: colors.text, marginVertical: 3 }}>
                {item.text}
              </TextEle>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentltyAdd;
