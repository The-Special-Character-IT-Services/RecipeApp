import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, TextInput, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import LikedRecipe from '../../components/LikedRecipe';
import AllFood from '../../assets/images/AllFood.jpg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const TabLikes = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '80%'], []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
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
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
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
