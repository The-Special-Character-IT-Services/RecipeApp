/* eslint-disable react-native/no-inline-styles */
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View, StatusBar, Dimensions, Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { deviceWidth, deviceHeight, showErrorToast } from '@utils/index';
// import { format, subDays } from 'date-fns';
import { useHeaderHeight } from '@react-navigation/stack';
import useSWR from 'swr';
import Icon from 'react-native-vector-icons/Ionicons';
import Rating from '@components/Rating';
import axios from '@utils/axios';
import { courseQuery } from '@hooks/useCoursesApiHook';

import Loading from '@components/loading';
import TextEle from '../../components/TextEle';
import { FlatList } from 'react-native-gesture-handler';

const subt = `Recipes in this write-up are protected by copyright law. Reproduction and distribution
of the same without a written consent from Studio D’ Food Couture is prohibited. ©
Studio De Food Couture `;

const YOUTUBE_VIDEO_HEIGHT = (deviceWidth / 16) * 9;

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const CourseDetailsBought = ({ route, navigation, item }) => {
  const { id, userId } = route.params;
  const { colors } = useTheme();
  const { data: courseDetail, mutate } = useSWR([courseQuery(id, userId)]);
  const [playing, setPlaying] = useState(false);
  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [deviceHeight - YOUTUBE_VIDEO_HEIGHT - headerHeight, '100%'], [
    headerHeight,
  ]);

  const rating = useMemo(
    () =>
      (courseDetail?.course?.rattings || []).reduce((p, c, i, a) => p + c.ratting / a.length, 0),
    [courseDetail?.course?.rattings],
  );

  const onRatingpress = async ratting => {
    try {
      const ratt = courseDetail?.course?.rattings.find(x => Number(x.user.id) === Number(userId));
      if (ratt) {
        await axios.put(`rattings/${ratt.id}`, {
          user: userId,
          course: id,
          ratting,
        });
      } else {
        await axios.post('rattings', {
          user: userId,
          course: id,
          ratting,
        });
      }
      mutate();
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (!courseDetail?.course) {
    return <Loading />;
  }

  const renderItem = ({ item }) => (
    <Pressable
      key={item?.id}
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
      }}
      onPress={() => navigation.navigate('RecipeDetail', { item })}>
      <Image
        source={{ uri: item?.recipeImage?.url }}
        style={{ height: 80, width: 100, borderRadius: 10 }}
      />
      <View style={{ flex: 1, height: '100%', paddingHorizontal: 12 }}>
        <TextEle
          variant="body1"
          style={{
            color: colors.text,
            flexDirection: 'row',
            marginVertical: 4,
          }}>
          {item.name}
        </TextEle>
        <TextEle
          variant="caption"
          style={{
            color: 'gray',
            flexDirection: 'row',
            marginVertical: 4,
          }}>
          {item.cookingLevel}
        </TextEle>
      </View>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          width: 40,
        }}>
        <Icon name="play-outline" size={24} color={colors.background} />
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <YoutubePlayer
        play={playing}
        height={YOUTUBE_VIDEO_HEIGHT}
        videoId={courseDetail?.course?.promoVideoYoutubeId}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: colors.background,
            }}>
            <View
              style={{
                alignSelf: 'center',
                width: (8 * deviceWidth) / 100,
                height: 5,
                borderRadius: 4,
                backgroundColor: colors.text,
              }}
            />
          </View>
        )}>
        <BottomSheetView
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: colors.background,
          }}>
          <BottomSheetView style={{ marginBottom: 100 }}>
            <BottomSheetView>
              <TextEle variant="subTitle2">{courseDetail?.course?.name}</TextEle>
              <TextEle variant="caption">{courseDetail?.course?.caption}</TextEle>
              <BottomSheetView>
                <TextEle variant="caption">{courseDetail?.course?.cuisine?.name}</TextEle>
                <BottomSheetView style={{ marginVertical: 5, alignItems: 'flex-start' }}>
                  <Rating
                    onPress={onRatingpress}
                    rating={rating}
                    length={5}
                    totalRating={courseDetail?.rattings?.length || 0}
                  />
                </BottomSheetView>
              </BottomSheetView>
            </BottomSheetView>
            <BottomSheetView
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginBottom: 20,
                paddingVertical: 10,
              }}>
              <TextEle variant="header1" style={{ marginBottom: 10 }}>
                Recipes
              </TextEle>
              <BottomSheetView style={{ height: 2, width: 100, backgroundColor: colors.text }} />
            </BottomSheetView>
            <FlatList
              data={courseDetail?.course?.recipes || []}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => `${item?.id}`}
            />
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

CourseDetailsBought.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default CourseDetailsBought;
