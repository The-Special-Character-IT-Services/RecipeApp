import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import Ingrediants from '../../components/Ingrediants';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const index = () => (
  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
    <ScrollView>
      <Image
        style={{
          height: windowHeight * 0.5,
          width: windowWidth,
          position: 'relative',
          top: 0,
          left: 0,
        }}
        source={require('../../assets/images/MorningCake.jpg')}
      />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,

          height: windowHeight * 0.6,
          backgroundColor: '#FFF',
          zIndex: 1,
        }}>
        <Ingrediants>Liked Recipe</Ingrediants>
      </View>
    </ScrollView>
  </View>
);

export default index;
