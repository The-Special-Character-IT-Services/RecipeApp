import { FastField, Formik } from 'formik';
import PropTypes from 'prop-types';

import React, { forwardRef } from 'react';
import { View } from 'react-native';
// import styles from './styles';

const index = forwardRef(({ fields, formStyle, ...rest }, ref) => (
  <Formik innerRef={ref} {...rest}>
    {() => (
      <View style={formStyle}>
        {fields.map(x => (
          <FastField key={x.name} {...x} />
        ))}
      </View>
    )}
  </Formik>
));

index.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  formStyle: PropTypes.func,
};

export default index;
