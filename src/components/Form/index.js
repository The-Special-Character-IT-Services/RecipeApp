import { Field, Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const index = ({ fields, ...rest }) => (
  <Formik {...rest}>
    {() => (
      <View style={[styles.container]}>
        {fields.map(x => (
          <Field {...x} />
        ))}
      </View>
    )}
  </Formik>
);

export default index;
