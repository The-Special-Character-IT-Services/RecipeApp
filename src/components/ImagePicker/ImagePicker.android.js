import React, { PureComponent } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextEle from '../TextEle';
// import styles from '../../../commonStyle';
const { width, height } = Dimensions.get('window');
class ImagePicker extends PureComponent {
  state = {
    isModalVisible: false,
  };

  openImageSelector = () => {
    this.setState(state => ({ isModalVisible: !state.isModalVisible }));
  };

  render() {
    const { children, colors, onSelectImage } = this.props;
    const { isModalVisible } = this.state;
    return (
      <>
        {children}
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                padding: 12,
                justifyContent: 'space-evenly',
                backgroundColor: colors.card,
                width: width * 0.9,
                height: height * 0.4,
                marginBottom: 20,
              }}>
              <TextEle variant="title1" style={{ paddingVertical: 8, color: colors.primary }}>
                Select Image
              </TextEle>
              <Pressable
                style={{ paddingVertical: 5 }}
                onPress={() =>
                  launchCamera(
                    {
                      mediaType: 'photo',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    response => {
                      this.openImageSelector(false);
                      onSelectImage(response);
                    },
                  )
                }>
                <View style={{ marginVertical: 10 }}>
                  <TextEle variant="subTitle2">Take Photo...</TextEle>
                </View>
              </Pressable>
              <Pressable
                style={{ paddingVertical: 5 }}
                onPress={() =>
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    response => {
                      this.openImageSelector(false);
                      onSelectImage(response);
                    },
                  )
                }>
                <View style={{ margingVertical: 5 }}>
                  <TextEle variant="subTitle2">Choose From Library....</TextEle>
                </View>
              </Pressable>
              <Pressable
                style={{ paddingVertical: 2, alignSelf: 'flex-end' }}
                onPress={() => this.openImageSelector(false)}>
                <TextEle variant="h1" style={{ fontSize: 16, color: colors.primary }}>
                  CANCEL
                </TextEle>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default ImagePicker;
