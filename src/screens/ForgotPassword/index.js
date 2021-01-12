import RAText from '@components/RAText';
import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import Form from '@components/Form';
import RAButton1 from '@components/RAButton1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { initialValues, forgotPasswordForm, formRef } from './fields';

const ForgotPassword = () => {
  const headerHight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const onSubmit = values => {
    console.log(values);
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
        variant="fill"
        text="Submit"
        onPress={formRef.current?.handleSubmit}
      />
    </View>
  );
};

export default ForgotPassword;
