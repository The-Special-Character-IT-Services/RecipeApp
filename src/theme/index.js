import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const colors = {
  white: '#fff',
  black: '#000',
};

export const RADarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...colors,
    primary: '#FABC05',
    secondaryText: 'rgba(0,0,0,0.7)',
    error: '#FF6464',
  },
};

export const RALightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    primary: '#FABC05',
    secondaryText: 'rgba(255,255,255,0.7)',
    error: '#FF6464',
  },
};
