import { useTheme } from '@react-navigation/native';
import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, View } from 'react-native';
// import TextEle from '../TextEle';
import IconCart from '../../assets/icons/cart-outline.svg';
import TextEle from '../../components/TextEle';

const CartIcon = ({ onCartPress }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={onCartPress}>
        <View
          style={{
            justifyContent: 'center',
            height: 48,
            width: 48,
          }}>
          <IconCart height={24} width={24} stroke={colors.text} />
          <View
            style={{
              flex: 1,
              position: 'absolute',
              top: 2,
              right: 14,
              backgroundColor: colors.primary,
              borderRadius: 30,
              height: 20,
              width: 20,
            }}>
            <TextEle
              variant="body2"
              style={{ position: 'absolute', top: -1, right: 5.5, color: colors.background }}>
              4
            </TextEle>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
CartIcon.propTypes = {
  onCartPress: PropTypes.func.isRequired,
};
export default CartIcon;
