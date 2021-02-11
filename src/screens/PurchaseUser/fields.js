/* eslint-disable max-len */
import { createRef } from 'react';
import RATextInput from '@components/RATextInput';

export const formRef = createRef();
export const usernameRef = createRef();
export const phoneRef = createRef();
export const emailRef = createRef();

export const purchaseUserForm = [
  {
    innerRef: usernameRef,
    name: 'name',
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
      emailRef.current?.focus();
    },
  },
  {
    innerRef: emailRef,
    name: 'email',
    defaultValue: '',
    placeholder: 'Email',
    autoCompleteType: 'email',
    keyboardType: 'email-address',
    returnKeyType: 'done',
    component: RATextInput,
    leftIcon: 'mail-outline',
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

export const initialValues = purchaseUserForm.reduce(
  (p, c) => ({ ...p, [c.name]: c.defaultValue }),
  { countryCode: '91' },
);
