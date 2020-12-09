/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

export default class index extends PureComponent {
  state = {
    valueText: '',
  };

  onchangeText = text => {
    this.setState({
      valueText: text,
    });
  };

  render() {
    return (
      <TextInput
        placeholder="Search here"
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 20,
          margin: 20,
        }}
        onchangeText={this.onchangeText}
      />
    );
  }
}
