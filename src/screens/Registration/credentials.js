/* eslint-disable max-len */
import React, { createRef } from 'react';
import RATextInput from '@components/RATextInput';
import RAOTPTextInput from '@components/RAOTPText';
import PhoneIcon from '@assets/icons/phone.svg';
import LockIcon from '@assets/icons/lock.svg';
import PersonIcon from '@assets/icons/person.svg';

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
    leftIcon: ({ ...rest }) => <PersonIcon {...rest} />,
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
    leftIcon: ({ ...rest }) => <PhoneIcon {...rest} />,
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
    leftIcon: ({ ...rest }) => <LockIcon {...rest} />,
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
