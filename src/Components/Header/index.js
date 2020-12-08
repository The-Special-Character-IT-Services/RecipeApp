/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image } from 'react-native';

const index = () => (
  <View>
    <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 10 }}>
      <Text style={{ paddingLeft: 10, fontSize: 30, marginTop: 20, flex: 1 }}>
        Hello there,
        <Text style={{ color: 'orange', fontWeight: 'bold' }}> Ana!</Text>
      </Text>
      <Image
        style={{ marginLeft: 30, height: 80, width: 80, borderRadius: 10 }}
        source={require('../../assets/images/profilelogo.png')}
      />
    </View>
  </View>
);

export default index;
