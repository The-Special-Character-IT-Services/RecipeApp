/**
 * @format
 */
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
