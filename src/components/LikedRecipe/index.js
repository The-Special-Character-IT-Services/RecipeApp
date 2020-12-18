/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import TextEle from '../TextEle';
import data from '../Carousal/data';
// import RecipeDetail from '../../screens/RecipeDetail';

const LikedRecipe = ({ onRecipeDetail }) => {
  const { colors } = useTheme();
  return (
    <BottomSheetView style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <TextEle
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1,
            marginVertical: 15,
          }}>
          Liked Recipes
        </TextEle>
        <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }} />
      </View>
      <BottomSheetScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {data.map(item => (
          <View
            key={item.id}
            style={{ flex: 1, flexDirection: 'row', marginVertical: 5, height: 100 }}>
            <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={item.img} />
            <RectButton
              rippleColor="#D3D3D3"
              style={{ flex: 1 }}
              onPress={() => onRecipeDetail(item)}>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 15,
                  justifyContent: 'center',
                }}>
                <TextEle style={{ fontWeight: 'bold', fontSize: 17 }}>{item.TextHeading}</TextEle>
                <TextEle style={{ color: 'gray' }}>{item.Description}</TextEle>
              </View>
            </RectButton>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheetView>
  );
};

LikedRecipe.propTypes = {
  onRecipeDetail: PropTypes.func.isRequired,
};

export default LikedRecipe;
