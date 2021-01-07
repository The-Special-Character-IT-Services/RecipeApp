/* eslint-disable max-len */
import RATextInput from '@components/RATextInput';

export const RegistrationForm = [
  {
    name: 'phone',
    defaultValue: '',
    placeholder: 'Phone',
    component: RATextInput,
    keyboardType: 'phone-pad',
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },

  {
    name: 'username',
    defaultValue: '',
    component: RATextInput,
    placeholder: 'Name',
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
  {
    name: 'confirmPassword',
    defaultValue: '',
    placeholder: 'Confirm Password',
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

export const initialValues = RegistrationForm.reduce(
  (p, c) => ({ ...p, [c.name]: c.defaultValue }),
  {},
);
