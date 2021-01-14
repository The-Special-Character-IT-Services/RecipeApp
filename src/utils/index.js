import { FOODCOUTURE_TOKEN } from '@constants/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export const isIOS = Platform.OS === 'ios';

// export const setToken = async data => {
//   await AsyncStorage.setItem(FOODCOUTURE_TOKEN, data);
// };

export const setToken = data =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    AsyncStorage.setItem(FOODCOUTURE_TOKEN, JSON.stringify(data))
      .then(val => resolve(val))
      .catch(err => reject(err));
  });

export const showErrorToast = error => {
  Toast.show({
    text1: 'Error',
    text2: `${error.message}`,
    type: 'error',
  });
};

export const showSuccessToast = message => {
  Toast.show({
    text1: 'Success',
    text2: message,
    type: 'success',
  });
};

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');
