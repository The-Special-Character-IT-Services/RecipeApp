import { StyleSheet } from 'react-native';

const getStyle = (colors, size, variant, disable, loading) => {
  const getVerticalPadding = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 15;
      default:
        return 20;
    }
  };

  let viewStyle = {};
  if (variant === 'outline') {
    viewStyle = {
      borderWidth: 2,
      borderColor: disable || loading ? colors.border : colors.primary,
    };
  }

  return StyleSheet.create({
    btn: {
      borderRadius: 32,
    },
    fill: {
      backgroundColor: disable || loading ? colors.border : colors.primary,
    },
    btnContainer: {
      ...viewStyle,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: getVerticalPadding(),
      paddingHorizontal: 32,
    },
    text: {
      marginHorizontal: 10,
      color: variant === 'fill' ? '#fff' : colors.primary,
    },
  });
};

export default getStyle;
