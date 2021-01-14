import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import Form from '@components/Form';
import SmsRetriever from 'react-native-sms-retriever';
import { useHeaderHeight } from '@react-navigation/stack';
import axios from '@utils/axios';
import { CancelToken } from 'axios';
import { isIOS, showErrorToast } from '@utils/index';
import RAText from '@components/RAText';
import RAButton1 from '@components/RAButton1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckCircleIcon from '@assets/icons/check_circle.svg';
import UncheckCircleIcon from '@assets/icons/uncheck_circle.svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { initialValues, registrationForm, formRef } from './credentials';

const rn = /\d+/;

const Registration = ({ navigation }) => {
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
    try {
      setLoading(true);
      const { countryCode, phone, ...userData } = values;
      let formData = { ...userData, phone: `+${countryCode}${phone}` };
      if (!isIOS) {
        const hash = await SmsRetriever.getAppSignature();
        formData = { ...formData, hash };
      }
      await axios.post('auth/local/registerPhone', formData, {
        cancelToken: cancelSource.token,
      });
      navigation.navigate('Verification', {
        verify: true,
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
          fields={registrationForm}
          onSubmit={onSubmit}
        />
        <View style={{ marginTop: 8 }}>
          <RAText variant="p1">Your Password must contain:</RAText>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
            {passwordVal.length >= 6 ? (
              <CheckCircleIcon height={24} width={24} />
            ) : (
              <UncheckCircleIcon height={24} width={24} />
            )}
            <RAText variant="p1" style={{ marginHorizontal: 8 }}>
              Atleast 6 characters
            </RAText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
            {passwordVal.match(rn) && passwordVal.match(rn)[0].length >= 1 ? (
              <CheckCircleIcon height={24} width={24} />
            ) : (
              <UncheckCircleIcon height={24} width={24} />
            )}
            <RAText variant="p1" style={{ marginHorizontal: 8 }}>
              Contains a number
            </RAText>
          </View>
        </View>
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

Registration.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Registration;
