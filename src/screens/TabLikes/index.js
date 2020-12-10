import React, { useMemo, useRef } from 'react';
import { Dimensions, TextInput, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import LikedRecipe from '../../components/LikedRecipe';
import TextEle from '../../components/TextEle';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const TabLikes = () => {
  const { colors } = useTheme();

  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '80%'], []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: windowHeight * 0.5,
          width: windowWidth,
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'orange',
        }}>
        <TextEle style={{}}>Liked Recipes</TextEle>
        <TextInput
          placeholder="Search your liked recipes"
          placeholderTextColor={colors.text}
          style={{
            color: colors.text,
            borderColor: colors.text,
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            margin: 20,
          }}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={headerHeight}>
        <BottomSheetView
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <LikedRecipe />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default TabLikes;
