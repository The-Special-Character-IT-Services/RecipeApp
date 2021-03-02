/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unused-state */
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
// import SearchSharp from '../../assets/icons/search-sharp.svg';

const Search = ({ text, clearText, ...rest }) => {
  const { colors } = useTheme();

  return (
    <View>
      <View style={{ flexDirection: 'row', margin: 20 }}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={colors.text}
          style={{
            flex: 1,
            height: 56,
            paddingHorizontal: 24,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 32,
            fontWeight: '500',
            fontFamily: 'Inter-Medium',
            fontSize: 15,
            fontStyle: 'normal',
            lineHeight: 18,
            letterSpacing: 0.7,
            textAlign: 'left',
            color: colors.text,
          }}
          {...rest}
        />

        {rest.value ? (
          <Pressable
            style={{
              padding: 10,
              zIndex: 10,
              position: 'absolute',
              top: 0,
              right: 10,
            }}
            onPress={clearText}>
            <Icon name="close-outline" size={30} style={{ color: colors.primary }} />
          </Pressable>
        ) : (
          <View>
            <Icon
              name="search-outline"
              size={24}
              style={{ position: 'absolute', color: colors.primary, top: 13, right: 13 }}
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

export default Search;
