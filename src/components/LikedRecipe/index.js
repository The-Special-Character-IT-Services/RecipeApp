/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { UserContext } from '@context/userContext';
import LikeButton from '@components/LikeButton';
import useFetchData from '@hooks/useFetchData';
import Loading from '@components/loading';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import TextEle from '../TextEle';

const LikedRecipe = ({ onRecipeDetail }) => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data, loading, fetchData } = useFetchData({
    query: coursesQuery({
      pageIndex: 0,
      limit: 5,
      sort: 'updated_at:DESC',
      where: `{like_event:{user:${user?.id}}}`,
      userId: user?.id,
    }),
  });

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 15 }}>
        {data?.courses?.map(item => (
          <View key={item.id}>
            <Pressable
              rippleColor={colors.card}
              onPress={() => onRecipeDetail(item)}
              key={item.id}
              style={{
                backgroundColor: colors.background,
              }}>
              <Image
                source={{
                  uri: item.image.url,
                }}
                style={{ aspectRatio: 16 / 9, borderRadius: 20 }}
              />
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View
                  style={{ flexDirection: 'column', flex: 1, paddingRight: 20, paddingBottom: 10 }}>
                  <TextEle style={{ paddingTop: 10 }} numberOfLines={1} variant="h1">
                    {item.name}
                  </TextEle>
                  <TextEle variant="p1">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(item.price)}
                  </TextEle>
                </View>
                <LikeButton courseId={item.id} />
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

LikedRecipe.propTypes = {
  onRecipeDetail: PropTypes.func.isRequired,
};

export default LikedRecipe;
