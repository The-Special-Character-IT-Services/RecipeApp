import RAText from '@components/RAText';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, ActivityIndicator, ViewPropTypes } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RectButton } from 'react-native-gesture-handler';
import getStyle from './styles';

const RAButton1 = ({ variant, size, text, icon, disable, onPress, loading, style }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyle(colors, size, variant, disable, loading), [
    colors,
    size,
    variant,
    disable,
    loading,
  ]);

  return (
    <RectButton
      underlayColor={(!disable || loading) && colors.text}
      rippleColor={(!disable || loading) && colors.border}
      style={[styles.btn, styles[variant], style]}
      {...((!disable || loading) && { onPress })}>
      <View accessible>
        <View style={[styles.btn, styles.btnContainer]}>
          {loading ? (
            <ActivityIndicator size="large" animating color="#fff" />
          ) : (
            <>
              {icon && (
                <Icon name={icon} size={24} color={variant === 'fill' ? '#fff' : colors.primary} />
              )}
              {text && (
                <RAText variant={size === 'small' ? 'bt2' : 'bt1'} style={styles.text}>
                  {text}
                </RAText>
              )}
            </>
          )}
        </View>
      </View>
    </RectButton>
  );
};

RAButton1.propTypes = {
  variant: PropTypes.oneOf(['fill', 'outline']),
  size: PropTypes.oneOf(['default', 'medium', 'small']),
  style: ViewPropTypes.style.isRequired,
  text: PropTypes.string,
  icon: PropTypes.func,
  disable: PropTypes.bool,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

RAButton1.defaultProps = {
  variant: '',
  size: 'default',
  text: '',
  icon: null,
  disable: false,
  loading: false,
  onPress: () => {},
};

export default RAButton1;
