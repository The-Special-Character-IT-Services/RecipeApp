/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { Text, TextInput, View } from 'react-native';

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
      <View>
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
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              paddingTop: 5,
              paddingStart: 10,
              marginLeft: 24,
              borderRadius: 8,
              borderWidth: 2,
              width: 80,
              height: 30,
              alignItems: 'center',
              borderColor: 'black',
            }}>
            Trending
          </Text>
          <Text
            style={{
              paddingTop: 5,
              paddingStart: 10,
              marginLeft: 10,
              flexDirection: 'row',
              borderRadius: 8,
              borderWidth: 2,
              width: 80,
              height: 30,
              alignItems: 'center',
              borderColor: 'black',
            }}>
            Rice Items
          </Text>
          <Text
            style={{
              paddingTop: 5,
              paddingStart: 10,
              marginLeft: 10,
              flexDirection: 'row',
              borderRadius: 8,
              borderWidth: 2,
              width: 80,
              height: 30,
              alignItems: 'center',
              borderColor: 'black',
            }}>
            Sweets
          </Text>
        </View>
      </View>
    );
  }
}
