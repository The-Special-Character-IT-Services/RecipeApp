import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const colors = {
  white: '#fff',
  black: '#000',
};

export const RADarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    primary: '#F6552E',
    secondaryText: 'rgba(255,255,255,0.7)',
    error: '#FF6464',
  },
};

export const RALightTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...colors,
    primary: '#F6552E',
    secondaryText: 'rgba(0,0,0,0.7)',
    error: '#FF6464',
  },
};
