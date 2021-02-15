import TextEle from '@components/TextEle';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const ListButton = ({ label, isVisibleIcon, onPress }) => {
  const [icon, setIcon] = useState('arrow-up-outline');
  const onButtonPress = () => {
    if (icon === 'arrow-up-outline') {
      setIcon('arrow-down-outline');
    } else {
      setIcon('arrow-up-outline');
    }
    onPress();
  };
  return (
    <RectButton onPress={onButtonPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextEle style={{ paddingVertical: 20, fontSize: 18, color: 'white' }}>{label}</TextEle>
        {isVisibleIcon && (
          <Icon
            name={icon}
            size={24}
            color="red"
            style={{ position: 'absolute', top: 23, right: 20 }}
          />
        )}
      </View>
    </RectButton>
  );
};

export default ListButton;
