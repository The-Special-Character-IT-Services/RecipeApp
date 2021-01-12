/* eslint-disable max-len */
import React, { createRef } from 'react';
import RATextInput from '@components/RATextInput';
import PhoneIcon from '@assets/icons/phone.svg';

export const formRef = createRef();

export const forgotPasswordForm = [
  {
    name: 'identifier',
    defaultValue: '',
    placeholder: 'Phone Number',
    keyboardType: 'phone-pad',
    returnKeyType: 'done',
    autoCompleteType: 'tel',
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
      formRef.current?.handleSubmit();
    },
  },
];

export const initialValues = forgotPasswordForm.reduce(
  (p, c) => ({ ...p, [c.name]: c.defaultValue }),
  {},
);
