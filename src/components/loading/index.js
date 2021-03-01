import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = ({ ...rest }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating size="large" color={colors.primary} {...rest} />
    </View>
  );
};

export default Loading;
