import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import Form from '@components/Form';
import { useHeaderHeight } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import { CancelToken } from 'axios';
import RAText from '@components/RAText';
import RAButton1 from '@components/RAButton1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RazorpayCheckout from 'react-native-razorpay';
import axios from '@utils/axios';
import PaymentSuccess from '@screens/PaymentSuccess';
import PaymentUnsuccessfull from '@screens/PaymentUnsuccessfull';
import { initialValues, purchaseUserForm, formRef } from './fields';

const PurchaseUser = ({ route, navigation }) => {
  const { orderDetails, CourseID } = route.params;
  const [passwordVal, setPasswordVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
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
    setLoading(true);
    const options = {
      description: `Credits towards ${orderDetails.course.name} course`,
      image:
        'https://res.cloudinary.com/thespecialcharacter-com/image/upload/v1614838972/48_f2075ba286.png',
      currency: orderDetails.currency,
      key: 'rzp_test_YI9BcxZ3N5ZRSL',
      amount: orderDetails.amount,
      name: 'Gourmet Food',
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
        setResult('success');
      })
      .catch(async error => {
        // handle failure
        await axios.put(`purchase-details/${orderDetails.id}`, {
          ...orderDetails,
          fail: true,
          error: error.description,
        });
        setResult('fail');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
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
      {!!result && (
        <Modal isVisible={!!result} style={{ margin: 0, padding: 0 }}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {result === 'success' && (
              <PaymentSuccess
                onDone={() => {
                  setResult('');
                  navigation.goBack();
                }}
              />
            )}
            {result === 'fail' && (
              <PaymentUnsuccessfull
                onDone={() => {
                  setResult('');
                  navigation.goBack();
                }}
              />
            )}
          </View>
        </Modal>
      )}
    </>
  );
};

PurchaseUser.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      CourseID: PropTypes.string,
      orderDetails: PropTypes.shape({
        amount_due: PropTypes.number,
        amount_paid: PropTypes.number,
        currency: PropTypes.string,
        razorpay_order_id: PropTypes.string,
        amount: PropTypes.number,
        course: PropTypes.shape({
          name: PropTypes.string,
        }).isRequired,
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

export default PurchaseUser;
