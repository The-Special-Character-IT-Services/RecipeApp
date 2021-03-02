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
import axios from '@utils/axios';
import { initialValues, purchaseUserForm, formRef } from './fields';

const PurchaseUser = ({ route, navigation }) => {
  const { orderDetails, CourseID } = route.params;
  const [passwordVal, setPasswordVal] = useState('');
  const [loading, setLoading] = useState(false);
  const headerHight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const cancelSource = useMemo(() => CancelToken.source(), []);
  console.log(CourseID);

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
        ...orderDetails,
        email: values.email,
        contact: values.phone,
        name: values.name,
      },
      theme: { color: '#53a20e' },
    };
    await axios.put(`purchase-details/${orderDetails.id}`, {
      ...orderDetails,
      email: values.email,
      contact: values.phone,
      name: values.name,
    });
    RazorpayCheckout.open(options)
      .then(async data => {
        // handle success
        await axios.put(`purchase-details/${orderDetails.id}`, {
          ...orderDetails,
          email: values.email,
          contact: values.phone,
          name: values.name,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_order_id: data.razorpay_order_id,
          razorpay_signature: data.razorpay_signature,
          status: 'purchased',
          purchase_date: new Date(),
          amount_paid: orderDetails.amount_due,
          amount_due: orderDetails.amount_paid,
          fail: false,
          error: '',
        });
        navigation.navigate('PaymentSuccess', { CourseID: CourseID });
      })
      .catch(async error => {
        // handle failure
        await axios.put(`purchase-details/${orderDetails.id}`, {
          ...orderDetails,
          fail: true,
          error: error.description,
        });
        navigation.navigate('PaymentSuccess', { CourseID: CourseID });
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
