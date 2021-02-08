/* eslint-disable max-len */
import { createRef } from 'react';
import RATextInput from '@components/RATextInput';

export const formRef = createRef();

export const youtubeSearchForm = [
  {
    name: 'search',
    defaultValue: '',
    placeholder: 'Search',
    returnKeyType: 'search',
    component: RATextInput,
    rightIcon: 'search-outline',
    onSubmitEditing: () => {
      formRef.current?.handleSubmit();
    },
  },
];

export const initialValues = youtubeSearchForm.reduce((p, c) => ({
  ...p,
  [c.name]: c.defaultValue,
}));
