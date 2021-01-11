/* eslint-disable max-len */
import RATextInput from '@components/RATextInput';
import RAOTPTextInput from '@components/RAOTPText';

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

export const OTPFields = [
  {
    name: 'otp',
    defaultValue: ['', '', '', ''],
    length: 4,
    placeholder: '-',
    component: RAOTPTextInput,
    validate: value => {
      let error = '';
      if (value.some(x => x === '')) {
        error = 'Required';
      }
      return error;
    },
  },
];

export const initialOTPValues = OTPFields.reduce(
  (p, c) => ({ ...p, [c.name]: c.defaultValue }),
  {},
);

export const initialValues = RegistrationForm.reduce(
  (p, c) => ({ ...p, [c.name]: c.defaultValue }),
  {},
);
