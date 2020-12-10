import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LikedRecipe from '../../components/LikedRecipe';
import TextEle from '../../components/TextEle';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const index = () => (
  <View style={{ flex: 1 }}>
    <ScrollView>
      <View
        style={{
          flex: 1,
          height: windowHeight * 0.3,
          width: windowWidth,
          position: 'relative',
          top: 0,
          left: 0,
          backgroundColor: 'orange',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextEle style={{ fontSize: 30, fontFamily: 'sans-serif' }}>Liked Recipe</TextEle>
        <TextInput />
      </View>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          backgroundColor: '#FFF',
          zIndex: 1,
        }}>
        <LikedRecipe>Liked Recipes</LikedRecipe>
      </View>
    </ScrollView>
  </View>
);

export default index;
