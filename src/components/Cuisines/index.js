/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TextEle from '../TextEle';
import useCuisinesApi from '../../hooks/useCuisinesApiHook';

const Cuisine = () => {
  const { data } = useCuisinesApi();
  console.log(JSON.stringify(data));
  return (
    <View>
      <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
        <TextEle variant="body1" style={{ fontWeight: 'bold', paddingLeft: 10 }}>
          Popular Cuisine
        </TextEle>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {data?.cuisines.map(item => (
          <View
            key={item.id}
            style={{
              paddingLeft: 5,
              marginVertical: 5,
              marginHorizontal: 5,
              alignItems: 'center',
            }}>
            <Image
              style={{
                borderRadius: 5,
                height: 70,
                width: 70,
              }}
              source={{ uri: item.image.formats.thumbnail.url }}
            />
            <TextEle variant="caption">{item.name}</TextEle>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cuisine;
