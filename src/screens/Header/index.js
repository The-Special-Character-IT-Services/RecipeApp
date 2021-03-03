/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import TextEle from '@components/TextEle';
import { getToken } from '@utils/';

const Header = () => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  useEffect(() => {
    const loadToken = async () => {
      const {
        user: { username },
      } = await getToken();
      setName(username);
    };
    loadToken();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 10 }}>
        <TextEle variant="header1" style={{ paddingLeft: 18, marginTop: 20, flex: 1 }}>
          {'Hello, \n'}
          <TextEle variant="header2" style={{ color: colors.primary }}>
            {name}
          </TextEle>
        </TextEle>
        <View style={{ justifyContent: 'center' }}>
          <Image
            style={{ height: 80, width: 80, borderRadius: 10 }}
            source={require('../../assets/images/profilelogo.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
