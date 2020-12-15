import { Formik } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RATextInput from '../../components/RATextInput';
import TextEle from '../../components/TextEle';

const Login = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validate={values => {
          const error = {};
          if (!values.username) {
            error.username = 'Required';
          }
          if (!values.password) {
            error.password = 'Required';
          }
          return error;
        }}
        onSubmit={value => console.log(value)}>
        {({ values, errors, handleChange, handleSubmit, handleBlur }) => (
          <View style={{ margin: 10 }}>
            <RATextInput
              name="username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
            {errors.username && <TextEle>{errors.username}</TextEle>}
            <RATextInput
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
            />
            {errors.password && <TextEle>{errors.password}</TextEle>}
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
