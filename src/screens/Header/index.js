import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ImagePicker from '@components/ImagePicker/ImagePicker';
import Image from 'react-native-fast-image';
import TextEle from '@components/TextEle';
import { getToken } from '@utils/';

const Header = () => {
  const { dark, colors } = useTheme();
  const [name, setName] = useState('');
  const imagePickerRef = useRef();
  useEffect(() => {
    const loadToken = async () => {
      const {
        user: { username },
      } = await getToken();
      setName(username);
    };
    loadToken();
  }, []);

  const [image, setImage] = useState();
  const onSelectImage = useCallback(response => {
    setImage(response);
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

        <Pressable style={{ justifyContent: 'center' }}>
          <ImagePicker {...{ dark, colors }} onSelectImage={onSelectImage} ref={imagePickerRef}>
            <Pressable
              onPress={() => {
                imagePickerRef.current.openImageSelector();
              }}>
              <View style={{ justifyContent: 'center' }}>
                <Image
                  style={{
                    height: 90,
                    width: 90,
                    borderRadius: 50,
                  }}
                  source={
                    image?.uri ? { uri: image.uri } : require('../../assets/images/profilelogo.png')
                  }
                />
              </View>
            </Pressable>
          </ImagePicker>
        </Pressable>
      </View>
    </View>
  );
};

export default memo(Header);
