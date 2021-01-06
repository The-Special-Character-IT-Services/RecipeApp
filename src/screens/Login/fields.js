/* eslint-disable max-len */
import RATextInput from '@components/RATextInput';

export const loginForm = [
  {
    name: 'identifier',
    defaultValue: '',
    placeholder: 'Email Address',
    keyboardType: 'email-address',
    component: RATextInput,
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },
  {
    name: 'password',
    defaultValue: '',
    placeholder: 'Password',
    component: RATextInput,
    secureTextEntry: true,
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },
];

export const initialValues = loginForm.reduce((p, c) => ({ ...p, [c.name]: c.defaultValue }), {});
