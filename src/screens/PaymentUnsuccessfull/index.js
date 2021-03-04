import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import TextEle from '@components/TextEle';
import RAButton1 from '@components/RAButton1';

const PaymentUnsuccessfull = ({ onDone }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <LottieView
      source={require('@assets/lottie/19230-payment-failed.json')}
      style={{ height: 300, width: 300 }}
      autoPlay
      loop={false}
    />
    <TextEle variant="header1">Payment Successful</TextEle>
    <RAButton1
      style={{ position: 'absolute', bottom: 10, width: '100%' }}
      variant="fill"
      text="Retry"
      onPress={onDone}
    />
  </View>
);

PaymentUnsuccessfull.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.string,
  }).isRequired,
};

export default PaymentUnsuccessfull;
