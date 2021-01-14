import RAText from '@components/RAText';
import PropTypes from 'prop-types';
import { useHeaderHeight } from '@react-navigation/stack';
import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Form from '@components/Form';
import RAButton1 from '@components/RAButton1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CancelToken } from 'axios';
import axios from '@utils/axios';
import { isIOS, showErrorToast, showSuccessToast } from '@utils/index';
import SmsRetrieverModule from 'react-native-sms-retriever';
import { initialValues, forgotPasswordForm, formRef } from './fields';

const ForgotPassword = ({ navigation }) => {
  const headerHight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const cancelSource = useMemo(() => CancelToken.source(), []);

  useEffect(
    () => () => {
      cancelSource.cancel();
    },
    [cancelSource],
  );

  const onSubmit = async values => {
    try {
      setLoading(true);
      let formData = { phone: `+${values.countryCode}${values.phone}` };
      if (!isIOS) {
        const hash = await SmsRetrieverModule.getAppSignature();
        formData = { ...formData, hash };
      }
      await axios.post('auth/forgot-password', formData, {
        cancelToken: cancelSource.token,
      });
      showSuccessToast(`OTP has been sent to ${formData.phone}`);
      navigation.navigate('Verification', {
        verify: false,
      });
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: headerHight + 20,
        marginBottom: insets.bottom + 20,
        marginHorizontal: 20,
      }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <RAText variant="h1" style={{ marginBottom: 8 }}>
          Password recovery
        </RAText>
        <RAText variant="p2" style={{ textAlign: 'center' }}>
          Enter your phone number to recover your password
        </RAText>
      </View>
      <Form
        ref={formRef}
        initialValues={initialValues}
        fields={forgotPasswordForm}
        onSubmit={onSubmit}
      />
      <RAButton1
        style={{ marginVertical: 32 }}
        loading={loading}
        variant="fill"
        text="Submit"
        onPress={() => formRef.current?.handleSubmit()}
      />
    </View>
  );
};

ForgotPassword.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ForgotPassword;
