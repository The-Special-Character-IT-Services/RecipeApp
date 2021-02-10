import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = ({ ...rest }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator animating size="large" color="red" {...rest} />
  </View>
);

export default Loading;
