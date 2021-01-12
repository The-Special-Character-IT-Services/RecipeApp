import RAText from '@components/RAText';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import getStyle from './styles';

const RAButton1 = ({ variant, size, text, icon: Icon, disable, onPress, style }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyle(colors, size, variant, disable), [
    colors,
    size,
    variant,
    disable,
  ]);

  return (
    <RectButton
      underlayColor={!disable && colors.text}
      rippleColor={!disable && colors.border}
      style={[styles.btn, styles[variant], style]}
      onPress={!disable && onPress}>
      <View accessible>
        <View style={[styles.btn, styles.btnContainer]}>
          {Icon && <Icon height={24} width={24} />}
          {text && (
            <RAText variant={size === 'small' ? 'bt2' : 'bt1'} style={styles.text}>
              {text}
            </RAText>
          )}
        </View>
      </View>
    </RectButton>
  );
};

RAButton1.propTypes = {
  variant: PropTypes.oneOf(['fill', 'outline']),
  size: PropTypes.oneOf(['default', 'medium', 'small']),
  text: PropTypes.string,
  icon: PropTypes.func,
  disable: PropTypes.bool,
  onPress: PropTypes.func,
};

RAButton1.defaultProps = {
  variant: '',
  size: 'default',
  text: '',
  icon: null,
  disable: false,
  onPress: () => {},
};

export default RAButton1;
