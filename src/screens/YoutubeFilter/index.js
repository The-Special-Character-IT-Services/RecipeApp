import React from 'react';
import { View, Text } from 'react-native';

const YoutubeFilter = () => (
  <View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ paddingVertical: 20, fontSize: 20, color: 'white' }}>Publish Date</Text>
    </View>
    <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ paddingVertical: 20, fontSize: 20, color: 'white' }}>Likes</Text>
    </View>
    <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
    <View>
      <Text style={{ paddingVertical: 20, fontSize: 20, color: 'white' }}>Views</Text>
      <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
    </View>
  </View>
);
export default YoutubeFilter;
