/* eslint-disable max-len */
import { createRef } from 'react';
import RATextInput from '@components/RATextInput';

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
    leftIcon: 'lock-closed-outline',
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

export const initialValues = loginForm.reduce((p, c) => ({ ...p, [c.name]: c.defaultValue }), {
  countryCode: '91',
});
