/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import useSWR from 'swr';
import { UserContext } from '@context/userContext';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import TextEle from '../TextEle';

const LikedRecipe = ({ onRecipeDetail }) => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery(0, 5, 'updated_at:DESC', `{like_event:{user:${user?.id}}}`),
  ]);
  console.log('🚀 ~ file: index.js ~ line 16 ~ LikedRecipe ~ data', data);

  useEffect(() => {
    console.log('hello');
  }, []);

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
        {data?.courses.map(item => (
          <View
            key={item.id}
            style={{ flex: 1, flexDirection: 'row', marginVertical: 5, height: 100 }}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 20 }}
              source={{ uri: item?.image?.url }}
            />
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
                <TextEle style={{ fontWeight: 'bold', fontSize: 17 }}>{item.name}</TextEle>
                <TextEle style={{ color: 'gray' }}>{item.caption}</TextEle>
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
