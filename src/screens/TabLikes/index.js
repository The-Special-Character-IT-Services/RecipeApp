import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import LikedRecipe from '../../components/LikedRecipe';
import AllFood from '../../assets/images/AllFood.jpg';
import SearchSharp from '../../assets/icons/search-sharp.svg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const TabLikes = ({ navigation }) => {
  const { colors } = useTheme();

  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '80%'], []);
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const onchangeText = val => {
    setText(val);
  };

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
        placeholder="Search here"
        placeholderTextColor={colors.text}
        style={{
          fontSize: 18,
          color: colors.text,
          borderWidth: 1,
          borderRadius: 20,
          marginVertical: 15,
          marginHorizontal: 15,
        }}
        value={text}
        onChangeText={onchangeText}
      />
      <SearchSharp
        height={24}
        width={24}
        fill={colors.text}
        style={{ position: 'absolute', top: 28, right: 28 }}
      />
      {text <= 0 ? (
        <BottomSheet
          ref={bottomSheetRef}
          initialSnapIndex={0}
          snapPoints={snapPoints}
          handleComponent={() => null}
          topInset={headerHeight}>
          <LikedRecipe
            onRecipeDetail={item => {
              navigation.navigate('RecipeDetail', item);
            }}
          />
        </BottomSheet>
      ) : (
        <BottomSheet
          ref={bottomSheetRef}
          initialSnapIndex={0}
          snapPoints={snapPoints}
          handleComponent={() => null}
          topInset={headerHeight}>
          <BottomSheetView
            style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
            <BottomSheetScrollView
              contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
              <Text>Hello</Text>
            </BottomSheetScrollView>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
};

TabLikes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabLikes;
