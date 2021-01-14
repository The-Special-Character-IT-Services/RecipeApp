/* eslint-disable max-len */
import React, { createRef } from 'react';
import RATextInput from '@components/RATextInput';
import LockIcon from '@assets/icons/lock.svg';

export const formRef = createRef();
export const passwordRef = createRef();
export const passwordConfirmationRef = createRef();

export const resetForm = [
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
      passwordConfirmationRef.current?.focus();
    },
  },
  {
    innerRef: passwordConfirmationRef,
    name: 'passwordConfirmation',
    leftIcon: ({ ...rest }) => <LockIcon {...rest} />,
    defaultValue: '',
    placeholder: 'Confirm Password',
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

export const initialValues = resetForm.reduce((p, c) => ({ ...p, [c.name]: c.defaultValue }), {});
