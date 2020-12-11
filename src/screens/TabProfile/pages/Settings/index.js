import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import TextEle from '../../../../components/TextEle';

const Settings = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <TextEle>Settings</TextEle>
    </View>
  );
};

export default Settings;
