import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import TextEle from '@components/TextEle';
import RAButton1 from '@components/RAButton1';
import { UserContext } from '@context/userContext';

const PaymentSuccess = ({ onDone }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <LottieView
      source={require('@assets/lottie/10470-confirm.json')}
      style={{ height: 300, width: 300 }}
      autoPlay
      loop={false}
    />
    <View style={{ position: 'absolute', bottom: 10, width: '100%', zIndex: 10 }}>
      <TextEle variant="header1" style={{ textAlign: 'center', marginBottom: 60 }}>
        Payment Successful
      </TextEle>
      <RAButton1 style={{ margin: 20 }} variant="fill" text="Done" onPress={onDone} />
    </View>
  </View>
);

PaymentSuccess.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      CourseID: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default PaymentSuccess;
