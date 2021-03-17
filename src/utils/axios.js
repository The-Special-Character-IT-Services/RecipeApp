/* eslint-disable */
import { FOODCOUTURE_TOKEN } from '@constants/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(FOODCOUTURE_TOKEN);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

const instance = axios.create({
  baseURL: Config.API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    const token = await getToken();
    config.headers.Authorization = token ? `Bearer ${token.jwt}` : '';
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    let err = error;
    if (err.response) {
      const { data, status } = err.response;

      switch (status) {
        case 400:
          if (data?.data[0]?.messages[0].message) {
            err = new Error(data?.data[0]?.messages[0].message);
          } else {
            err = new Error('Something went wrong, Try after sometime.');
          }
          break;
        case 401:
          err = new Error('Please Login to continue.');
          break;
        case 404:
          err = new Error('Server is down. Try After sometime.');
          break;
        case 500:
          err = new Error('Something went wrong, Try after sometime.');
          break;

        default:
          err = new Error('Something went wrong, Try after sometime.');
          break;
      }
    }
    // if (error?.response.data?.data[0]?.messages[0].message) {
    //   err = new Error(error.response.data?.data[0]?.messages[0].message);
    // }
    return Promise.reject(err);
  },
);

export default instance;
