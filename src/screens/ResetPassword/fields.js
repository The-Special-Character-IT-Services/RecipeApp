/* eslint-disable max-len */
import { createRef } from 'react';
import RATextInput from '@components/RATextInput';

export const formRef = createRef();
export const passwordRef = createRef();
export const passwordConfirmationRef = createRef();

export const resetForm = [
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
      passwordConfirmationRef.current?.focus();
    },
  },
  {
    innerRef: passwordConfirmationRef,
    name: 'passwordConfirmation',
    leftIcon: 'lock-closed-outline',
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
