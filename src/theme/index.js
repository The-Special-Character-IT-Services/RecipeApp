import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const RADarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F6552E',
  },
};

export const RALightTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#F6552E',
  },
};
