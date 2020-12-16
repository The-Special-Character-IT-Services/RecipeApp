import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form from '../../components/Form';
import { initialValues, loginForm } from './fields';

const Login = () => {
  const insets = useSafeAreaInsets();
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Form initialValues={initialValues} fields={loginForm} onSubmit={onSubmit} />
    </View>
  );
};

export default Login;
