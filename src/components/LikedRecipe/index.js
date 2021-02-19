/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Image from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import useSWR from 'swr';
import { UserContext } from '@context/userContext';
import Loading from '@components/loading';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import TextEle from '../TextEle';
import LikeButton from '@components/LikeButton';

const LikedRecipe = ({ onRecipeDetail }) => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery({
      pageIndex: 0,
      limit: 5,
      sort: 'updated_at:DESC',
      where: `{like_event:{user:${user?.id}}}`,
      userId: user?.id,
    }),
  ]);
  if (!data) {
    return <Loading />;
  }
  // useFocusEffect(
  //   useCallback(() => {
  //     mutate();
  //   }, [mutate]),
  // );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {data?.courses.map(item => (
          <View>
            <RectButton
              rippleColor={colors.card}
              onPress={() => onRecipeDetail(item)}
              key={item.id}
              style={{
                backgroundColor: colors.background,
                margin: 5,
              }}>
              <Image
                source={{
                  uri: item.image.url,
                }}
                style={{ aspectRatio: 16 / 9, borderRadius: 20 }}
              />
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flexDirection: 'column', flex: 1, paddingRight: 20 }}>
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
            </RectButton>
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
