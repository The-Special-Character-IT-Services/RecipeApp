import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import Form from '@components/Form';
import { useHeaderHeight } from '@react-navigation/stack';
import { CancelToken } from 'axios';
import RAText from '@components/RAText';
import RAButton1 from '@components/RAButton1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RazorpayCheckout from 'react-native-razorpay';
import { initialValues, purchaseUserForm, formRef } from './fields';

const PurchaseUser = ({ route }) => {
  const { orderDetails } = route.params;
  const [passwordVal, setPasswordVal] = useState('');
  const [loading, setLoading] = useState(false);
  const headerHight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const cancelSource = useMemo(() => CancelToken.source(), []);

  useEffect(
    () => () => {
      cancelSource.cancel();
    },
    [cancelSource],
  );

  const onSubmit = async values => {
    const options = {
      description: `Credits towards ${orderDetails.course.name} course`,
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: orderDetails.currency,
      key: 'rzp_test_YI9BcxZ3N5ZRSL',
      amount: orderDetails.amount,
      name: 'Acme Corp',
      order_id: orderDetails.razorpay_order_id,
      prefill: {
        email: values.email,
        contact: values.phone,
        name: values.name,
      },
      theme: { color: '#53a20e' },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: headerHight,
        paddingBottom: insets.bottom + 20,
        paddingHorizontal: 20,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <RAText variant="h1">Welcome!</RAText>
          <RAText variant="p2">Please enter your account here</RAText>
        </View>
        <Form
          validate={values => {
            setPasswordVal(values.password);
            return {};
          }}
          ref={formRef}
          initialValues={initialValues}
          fields={purchaseUserForm}
          onSubmit={onSubmit}
        />
        <RAButton1
          loading={loading}
          style={{ marginVertical: 16 }}
          variant="fill"
          text="Submit"
          onPress={() => formRef.current?.handleSubmit()}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

PurchaseUser.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default PurchaseUser;
