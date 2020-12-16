import { Field, Formik } from 'formik';
import React from 'react';
import { View, Button } from 'react-native';

const index = ({ fields, ...rest }) => (
  <Formik {...rest}>
    {({ handleSubmit }) => (
      <View style={{ margin: 10 }}>
        {fields.map(x => (
          <Field {...x} />
        ))}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    )}
  </Formik>
);

export default index;
