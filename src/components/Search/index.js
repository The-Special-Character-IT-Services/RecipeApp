/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unused-state */
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
// import SearchSharp from '../../assets/icons/search-sharp.svg';

const Search = ({ text, ...rest }) => {
  const { colors } = useTheme();

  return (
    <View>
      <View style={{ flexDirection: 'row', margin: 20 }}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={colors.text}
          style={{
            flex: 1,
            height: 50,
            fontSize: 20,
            color: colors.text,
            borderColor: colors.text,
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
          {...rest}
        />

        {text ? (
          <Pressable>
            <Icon
              name="close-outline"
              size={24}
              fill={colors.text}
              style={{ position: 'absolute', top: 13, right: 10 }}
            />
          </Pressable>
        ) : (
          <View>
            <Icon
              name="search-outline"
              size={24}
              fill={colors.text}
              style={{ position: 'absolute', top: 13, right: 10 }}
            />
          </View>
        )}
        {/* <SearchSharp
          height={24}
          width={24}
          fill={colors.text}
          style={{ position: 'absolute', top: 13, right: 10 }}
        /> */}
      </View>
    </View>
  );
};

Search.propTypes = {
  onchangeText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default Search;
