import React from 'react';
import { Dimensions, View } from 'react-native';
import Video from 'react-native-video';

const index = () => (
  <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
    <Video
      source={{
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16),
        backgroundColor: 'black',
      }}
      controls
      resizeMode="cover"
    />
  </View>
);

export default index;
