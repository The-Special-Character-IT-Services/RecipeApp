import { Field, Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import RAButton from '../RAButton';
import styles from './styles';

const index = ({ fields, ...rest }) => (
  <Formik {...rest}>
    {() => (
      <View style={[styles.container]}>
        {fields.map(x => (
          <Field {...x} />
        ))}

        <RAButton title="Submit" />
      </View>
    )}
  </Formik>
);

export default index;
