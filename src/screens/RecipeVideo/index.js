import React from 'react';
import { Dimensions } from 'react-native';
import Video from 'react-native-video';
import Food from '../../assets/Videos/anotherfood.mp4';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
const index = () => (
  <Video
    style={{
      height: windowHeight * 0.5,
      width: windowWidth,
    }}
    resizeMode="cover"
    source={Food}
  />
);

export default index;
