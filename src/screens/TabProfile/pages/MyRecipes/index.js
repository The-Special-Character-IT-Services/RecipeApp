import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import data from './data';
import TextEle from '../../../../components/TextEle';
import StarIcon from '../../../../assets/icons/star-icon.svg';

const MyRecipes = () => {
  const { colors } = useTheme();
  return (
    <FlatList
      data={data}
      style={{ backgroundColor: colors.card }}
      renderItem={({ item }) => (
        <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
          <View
            style={{
              justifyContent: 'space-around',
            }}
            key={item.id}>
            <Image
              imageStyle={{ borderRadius: 15 }}
              source={item.img}
              style={{
                height: 230,
                width: 150,
                borderRadius: 20,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
              justifyContent: 'space-between',
            }}>
            <TextEle variant="body2" style={{ color: colors.text, paddingLeft: 10 }}>
              {item.text}
            </TextEle>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 20,
                paddingLeft: 10,
              }}>
              <StarIcon fill="white" />
              <TextEle variant="body2" style={{ color: colors.text }}>
                {item.rating}
              </TextEle>
            </View>
          </View>
        </View>
      )}
      numColumns={2}>
      <View style={{ flexDirection: 'column' }} />
    </FlatList>
  );
};

export default MyRecipes;
