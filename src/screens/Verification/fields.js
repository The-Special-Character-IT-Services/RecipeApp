import { createRef } from 'react';
import RAOTPTextInput from '@components/RAOTPText';

export const formRef = createRef();

export const otpForm = [
  {
    name: 'otp',
    defaultValue: '',
    component: RAOTPTextInput,
  },
];

export const initialValues = otpForm.reduce((p, c) => ({ ...p, [c.name]: c.defaultValue }), {});
