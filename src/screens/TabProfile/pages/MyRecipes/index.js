import React from 'react';
import { View, ImageBackground } from 'react-native';
import data from '../../../../components/Preparation/data';
import TextEle from '../../../../components/TextEle';

const MyRecipes = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ flexDirection: 'row' }}>
      {data.map(item => (
        <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingTop: 10 }} key={item.id}>
          <ImageBackground
            imageStyle={{ borderRadius: 15 }}
            source={item.img}
            style={{
              height: 230,
              width: 150,
              borderRadius: 500,
            }}>
            <TextEle variant="caption" style={{ color: 'white', paddingLeft: 10, paddingTop: 5 }}>
              {item.text}
            </TextEle>
          </ImageBackground>
        </View>
      ))}
    </View>
  </View>
);

export default MyRecipes;
