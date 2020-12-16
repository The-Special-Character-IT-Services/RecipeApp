import { Field, Formik } from 'formik';
import React from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import { View, Button } from 'react-native';
import TextEle from '../TextEle';

const data = [
  {
    label: 'Male',
  },
  {
    label: 'Female',
  },
];

const index = ({ fields, ...rest }) => (
  <Formik {...rest}>
    {({ handleSubmit }) => (
      <View style={{ margin: 10 }}>
        {fields.map(x => (
          <Field {...x} />
        ))}

        <View style={{ marginVertical: 20 }}>
          <TextEle>Gender</TextEle>
          <RadioButtonRN data={data} selectedBtn={e => console.log(e)} box={false} />
        </View>
        <Button title="Register" onPress={handleSubmit} />
      </View>
    )}
  </Formik>
);

export default index;
