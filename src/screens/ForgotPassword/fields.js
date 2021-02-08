/* eslint-disable max-len */
import { createRef } from 'react';
import RATextInput from '@components/RATextInput';

export const formRef = createRef();

export const forgotPasswordForm = [
  {
    name: 'phone',
    defaultValue: '',
    placeholder: 'Phone Number',
    keyboardType: 'phone-pad',
    returnKeyType: 'done',
    autoCompleteType: 'tel',
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
      formRef.current?.handleSubmit();
    },
  },
];

export const initialValues = forgotPasswordForm.reduce(
  (p, c) => ({ ...p, [c.name]: c.defaultValue }),
  { countryCode: '91' },
);
