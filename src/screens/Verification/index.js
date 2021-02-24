import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import Form from '@components/Form';
import RAText from '@components/RAText';
import { useHeaderHeight } from '@react-navigation/stack';
import SmsRetriever from 'react-native-sms-retriever';
import RAButton1 from '@components/RAButton1';
import { useTheme } from '@react-navigation/native';
import useLoginHook from '@hooks/useLoginHook';
import axios from '@utils/axios';
import { initialValues, otpForm, formRef } from './fields';

const RESEND_OTP_TIME_LIMIT = 60; // 30 secs

let interval;

const Verification = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { verify } = route.params;
  const headerHight = useHeaderHeight();
  const { loginProcess } = useLoginHook();
  const [activeResend, setActiveResend] = useState(false);
  const [initialValuesState, setinitialValuesState] = useState(initialValues);
  const counterRef = useRef();

  const startInterval = useCallback(() => {
    let count = RESEND_OTP_TIME_LIMIT;
    interval = setInterval(() => {
      count -= 1;
      if (counterRef.current) {
        counterRef.current.setNativeProps({ text: `${count}` });
      }
      if (count <= 0) {
        clearInterval(interval);
        setActiveResend(true);
      }
    }, 1000);
  }, []);

  const smsRetriverListner = useCallback(async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          SmsRetriever.removeSmsListener();
          if (event.message) {
            const otp = /(\d{4})/g.exec(event.message)[1];
            setinitialValuesState({ otp });
            formRef.current?.handleSubmit();
          }
        });
      }
    } catch (error) {
      showErrorToast(JSON.stringify(error));
    }
  }, []);

  useEffect(() => {
    startInterval();
    smsRetriverListner();
    return () => {
      if (interval) clearInterval(interval);
      SmsRetriever.removeSmsListener();
    };
  }, [startInterval, smsRetriverListner]);

  const resendOTP = () => {
    setActiveResend(false);
    startInterval();
  };

  const onSubmit = async values => {
    try {
      if (verify) {
        const res = await axios.get(`auth/sms-confirmation?confirmation=${values.otp}`);
        await loginProcess(res, 'phone');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        navigation.replace('ResetPassword', {
          code: values.otp,
        });
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: headerHight,
          marginBottom: 20,
          marginHorizontal: 20,
        }}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <RAText variant="h1" style={{ marginBottom: 8 }}>
              Check your message
            </RAText>
            <RAText variant="p2">We.ve sent the code to your phone number</RAText>
          </View>
          <Form
            enableReinitialize
            ref={formRef}
            initialValues={initialValuesState}
            fields={otpForm}
            onSubmit={onSubmit}
            validate={values => {
              const err = {};
              if (values.otp?.length < 4) {
                err.otp = 'Required';
              }
              return err;
            }}
          />
          {!activeResend && (
            <View style={{ flexDirection: 'row', marginTop: 48, justifyContent: 'center' }}>
              <RAText variant="p2">I didnt get a code: (available in 00:</RAText>
              <TextInput
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: 15,
                  padding: 0,
                  margin: 0,
                  letterSpacing: 0.5,
                  color: colors.text,
                }}
                ref={counterRef}
                defaultValue={`${RESEND_OTP_TIME_LIMIT}`}
              />
              <RAText variant="p2">)</RAText>
            </View>
          )}
          <RAButton1
            style={{ marginBottom: 16, marginTop: 48 }}
            variant="fill"
            text="Verify"
            onPress={() => formRef.current?.handleSubmit()}
          />
          <RAButton1 disable={!activeResend} variant="fill" text="Send Again" onPress={resendOTP} />
        </View>
      </View>
    </View>
  );
};

Verification.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    reset: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      verify: PropTypes.bool,
    }),
  }).isRequired,
};
export default Verification;
