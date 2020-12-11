import React from 'react';
import { View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import data from './data';
import TextEle from '../../../../components/TextEle';
import StarIcon from '../../../../assets/icons/star-icon.svg';

const MyRecipes = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
        <View
          style={{
            justifyContent: 'space-around',
          }}
          key={item.id}>
          <ImageBackground
            imageStyle={{ borderRadius: 15 }}
            source={item.img}
            style={{
              height: 230,
              width: 150,
              borderRadius: 500,
            }}>
            <TextEle variant="body2" style={{ color: 'white', paddingLeft: 10, paddingTop: 5 }}>
              {item.text}
            </TextEle>
            <View
              style={{
                flex: 1,
                flexWrap: 'wrap-reverse',
                justifyContent: 'flex-start',
                padding: 10,
                flexDirection: 'row',
              }}>
              <StarIcon fill="white" />
              <TextEle variant="body2" style={{ color: 'white' }}>
                {item.rating}
              </TextEle>
            </View>
          </ImageBackground>
        </View>
      </View>
    )}
    numColumns={2}>
    <View style={{ flexDirection: 'column' }} />
  </FlatList>
);

export default MyRecipes;
