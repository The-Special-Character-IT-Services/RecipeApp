/* eslint-disable max-len */
import React, { createRef } from 'react';
import RATextInput from '@components/RATextInput';
import PhoneIcon from '@assets/icons/phone.svg';
import LockIcon from '@assets/icons/lock.svg';

export const formRef = createRef();
export const identifierRef = createRef();
export const passwordRef = createRef();

export const loginForm = [
  {
    innerRef: identifierRef,
    name: 'identifier',
    defaultValue: '',
    placeholder: 'Phone Number',
    keyboardType: 'phone-pad',
    component: RATextInput,
    autoCompleteType: 'tel',
    returnKeyType: 'next',
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
    leftIcon: ({ ...rest }) => <LockIcon {...rest} />,
    defaultValue: '',
    placeholder: 'Password',
    component: RATextInput,
    secureTextEntry: true,
    autoCompleteType: 'password',
    returnKeyType: 'done',
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

export const initialValues = loginForm.reduce((p, c) => ({ ...p, [c.name]: c.defaultValue }), {});
