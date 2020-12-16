import RATextInput from '../../components/RATextInput';

export const loginForm = [
  {
    name: 'username',
    defaultValue: '',
    component: RATextInput,
    placeholder: 'Username',
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },
  {
    name: 'email',
    defaultValue: '',
    component: RATextInput,
    placeholder: 'Email',
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },
  {
    name: 'name',
    defaultValue: '',
    placeholder: 'Name',
    component: RATextInput,
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },
  {
    name: 'password',
    defaultValue: '',
    placeholder: 'Password',
    component: RATextInput,
    secureTextEntry: true,
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },
  {
    name: 'confirmPassword',
    defaultValue: '',
    placeholder: 'Confirm Password',
    component: RATextInput,
    secureTextEntry: true,
    validate: value => {
      let error = '';
      if (!value) {
        error = 'Required';
      }
      return error;
    },
  },
];

export const initialValues = loginForm.reduce((p, c) => ({ ...p, [c.name]: c.defaultValue }), {});
