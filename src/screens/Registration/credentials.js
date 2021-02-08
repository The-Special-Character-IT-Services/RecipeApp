/* eslint-disable max-len */
import { createRef } from 'react';
import RATextInput from '@components/RATextInput';
import RAOTPTextInput from '@components/RAOTPText';

export const formRef = createRef();
export const usernameRef = createRef();
export const phoneRef = createRef();
export const passwordRef = createRef();

export const registrationForm = [
  {
    innerRef: usernameRef,
    name: 'username',
    defaultValue: '',
    component: RATextInput,
    placeholder: 'Name',
    autoCompleteType: 'name',
    returnKeyType: 'next',
    leftIcon: 'person-outline',
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
    onSubmitEditing: () => {
      phoneRef.current?.focus();
    },
  },
  {
    innerRef: phoneRef,
    name: 'phone',
    defaultValue: '',
    placeholder: 'Phone Number',
    keyboardType: 'phone-pad',
    autoCompleteType: 'tel',
    returnKeyType: 'next',
    component: RATextInput,
    leftIcon: 'call-outline',
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
    onSubmitEditing: () => {
      passwordRef.current?.focus();
    },
  },
  {
    innerRef: passwordRef,
    name: 'password',
    defaultValue: '',
    placeholder: 'Password',
    autoCompleteType: 'password',
    returnKeyType: 'done',
    component: RATextInput,
    leftIcon: 'lock-closed-outline',
    secureTextEntry: true,
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
    onSubmitEditing: () => {
      formRef.current?.handleSubmit();
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

export const initialValues = registrationForm.reduce(
  (p, c) => ({ ...p, [c.name]: c.defaultValue }),
  { countryCode: '91' },
);
