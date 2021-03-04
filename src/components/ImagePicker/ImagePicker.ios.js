import { useTheme } from '@react-navigation/native';
import React, { useCallback, PureComponent } from 'react';
import { ActionSheetIOS, Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextEle from '../TextEle';

class ImagePicker extends PureComponent {
  openImageSelector = () => {
    const { dark, onSelectImage } = this.props;
    return ActionSheetIOS.showActionSheetWithOptions(
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
    );
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ImagePicker;
