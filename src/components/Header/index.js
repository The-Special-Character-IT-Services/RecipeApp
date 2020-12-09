/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View, Image } from 'react-native';
import TextEle from '../TextEle';

const index = () => (
  <View>
    <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 10 }}>
      <TextEle variant="header1" style={{ paddingLeft: 18, marginTop: 20, flex: 1 }}>
        {'Hello there, '}
        <TextEle variant="header2" style={{ color: 'orange' }}>
          Priya!
        </TextEle>
      </TextEle>
      <Image
        style={{ marginLeft: 30, height: 80, width: 80, borderRadius: 10 }}
        source={require('../../assets/images/profilelogo.png')}
      />
    </View>
  </View>
);

export default index;
