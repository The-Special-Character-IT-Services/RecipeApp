import { useTheme } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActionSheetIOS, Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextEle from '../TextEle';

const ImagePicker = ({ onSelectImage }) => {
  const { colors } = useTheme();
  const openImageSelector = useCallback(
    () =>
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo...', 'Select From Library...'],
          cancelButtonIndex: 0,
          userInterfaceStyle: dark ? 'dark' : 'light',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
            launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              onSelectImage,
            );
          } else if (buttonIndex === 2) {
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              onSelectImage,
            );
          }
        },
      ),
    [dark, onSelectImage],
  );

  return (
    <Pressable onPress={openImageSelector}>
      <TextEle>Select Image</TextEle>
    </Pressable>
  );
};

export default ImagePicker;
