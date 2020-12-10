import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import Food from '../../assets/Videos/anotherfood.mp4';

const index = () => (
  <View
    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
    <Video
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 800,
        width: 800,
      }}
      source={Food}
    />
  </View>
);

export default index;
