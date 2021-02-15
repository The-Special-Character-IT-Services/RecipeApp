import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const YoutubeFilter = () => (
  <View style={{ flex: 1, marginLeft: 20 }}>
    <RectButton>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ paddingVertical: 20, fontSize: 18, color: 'white' }}>Publish Date</Text>
        <Icon
          name="arrow-down-outline"
          size={24}
          color="red"
          style={{ position: 'absolute', top: 13, right: 10 }}
        />
      </View>
    </RectButton>
    <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
    <RectButton>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ paddingVertical: 20, fontSize: 18, color: 'white' }}>Likes</Text>
      </View>
    </RectButton>
    <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
    <RectButton>
      <View>
        <Text style={{ paddingVertical: 20, fontSize: 18, color: 'white' }}>Views</Text>
      </View>
    </RectButton>
    <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
  </View>
);
export default YoutubeFilter;
