import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, Share, View } from 'react-native';
import ShareButton from '../../assets/icons/share-black-18dp.svg';

const ShareIcon = () => {
  const { colors } = useTheme();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginRight: 20 }}>
      <Pressable onPress={onShare} title="Share">
        <ShareButton height={24} width={24} fill={colors.background} />
      </Pressable>
    </View>
  );
};

export default ShareIcon;
