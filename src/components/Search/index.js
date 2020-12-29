/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unused-state */
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

import React from 'react';
import { TextInput, View } from 'react-native';
import SearchSharp from '../../assets/icons/search-sharp.svg';

const Search = ({ ...rest }) => {
  const { colors } = useTheme();
  return (
    <View>
      <View style={{ flexDirection: 'row', margin: 20 }}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={colors.text}
          style={{
            flex: 1,
            fontSize: 18,
            color: colors.text,
            borderColor: colors.text,
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
          {...rest}
        />
        <SearchSharp
          height={24}
          width={24}
          fill={colors.text}
          style={{ position: 'absolute', top: 7, right: 10 }}
        />
      </View>
    </View>
  );
};

Search.propTypes = {
  onchangeText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default Search;
