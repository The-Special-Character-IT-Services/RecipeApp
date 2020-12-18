import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, TextInput, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useLayout } from '@react-native-community/hooks';
import LikedRecipe from '../../components/LikedRecipe';
import AllFood from '../../assets/images/AllFood.jpg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const TabLikes = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { onLayout, ...layout } = useLayout();

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(
    () => [windowHeight * 0.6, windowHeight - layout.height - insets.top],
    [layout.height, insets.top],
  );

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          height: windowHeight * 0.5,
          width: windowWidth,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        source={AllFood}
      />
      <View onLayout={onLayout} style={{ paddingTop: insets.top, paddingBottom: 30 }}>
        <TextInput
          placeholder="Search your liked recipes"
          placeholderTextColor={colors.text}
          style={{
            color: colors.text,
            borderColor: colors.text,
            borderWidth: 2,
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            margin: 20,
          }}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={insets.top}>
        <LikedRecipe
          onRecipeDetail={item => {
            navigation.navigate('RecipeDetail', item);
          }}
        />
      </BottomSheet>
    </View>
  );
};

TabLikes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabLikes;
