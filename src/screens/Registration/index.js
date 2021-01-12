import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Form from '@components/Form';
import { useHeaderHeight } from '@react-navigation/stack';
import axios from '@utils/axios';
import { isIOS } from '@utils/index';
import RAText from '@components/RAText';
import RAButton1 from '@components/RAButton1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckCircleIcon from '@assets/icons/check_circle.svg';
import UncheckCircleIcon from '@assets/icons/uncheck_circle.svg';
import { initialValues, registrationForm, formRef } from './credentials';

const rn = /\d+/;

const Registration = ({ navigation }) => {
  const [passwordVal, setPasswordVal] = useState('');
  const { colors } = useTheme();
  const headerHight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const onSubmit = async values => {
    try {
      const { confirmPassword, ...userData } = values;
      let formData = userData;
      if (!isIOS) {
        const hash = await SmsRetriever.getAppSignature();
        formData = { ...formData, hash };
      }
      const user = await axios.post('auth/local/registerPhone', formData);
      console.warn(user.data);
      navigation.navigate('Verification');

      // const token = await axios.get(
      //   `/auth/sms-confirmation?confirmation=${user.data.confirmationSMSToken}`,
      // );
      // console.warn(token.data);
    } catch (error) {
      console.warn(error.message);
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
        <View style={{ flex: 3, justifyContent: 'flex-end' }}>
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
            style={{ marginVertical: 16 }}
            variant="fill"
            text="Submit"
            onPress={formRef.current?.handleSubmit}
          />
        </View>
      </View>
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
