/* eslint-disable react-native/no-inline-styles */
// import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
// import ShareButton from '../../assets/icons/share-black-18dp.svg';
import TextEle from '../TextEle';

const AddToCart = () => {
  const [count, setCount] = useState(0);

  const onAdd = val => {
    setCount(count + val);
  };
  return (
    <Pressable
      onPress={() => onAdd(1)}
      style={{
        height: 30,
        borderRadius: 5,
        backgroundColor: '#FD6D3B',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Pressable onPress={() => onAdd(1)}>
        {count > 0 && <TextEle style={{ paddingHorizontal: 10 }}>+</TextEle>}
      </Pressable>
      <TextEle style={{ paddingHorizontal: 10 }}>{count > 0 ? count : 'Add'}</TextEle>
      <Pressable onPress={() => onAdd(-1)}>
        {count > 0 && <TextEle style={{ paddingHorizontal: 10 }}>-</TextEle>}
      </Pressable>
    </Pressable>
  );
};
export default AddToCart;
