/* eslint-disable react-native/no-inline-styles */
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View, StatusBar, Dimensions, Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { deviceWidth, deviceHeight, showErrorToast } from '@utils/index';
// import { format, subDays } from 'date-fns';
// import { useHeaderHeight } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Rating from '@components/Rating';
import axios from '@utils/axios';
import { courseQuery } from '@hooks/useCoursesApiHook';
import useFetchData from '@hooks/useFetchData';
import Loading from '@components/loading';
import { FlatList } from 'react-native-gesture-handler';
import ShareButton from '../../components/ShareButton';
import TextEle from '../../components/TextEle';

const YOUTUBE_VIDEO_HEIGHT = (deviceWidth / 15) * 10;

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

// const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const CourseDetailsBought = ({ route, navigation }) => {
  const { id, userId } = route.params;
  const { colors } = useTheme();
  const { data: courseDetail, fetchData, loading } = useFetchData({
    query: courseQuery(id, userId),
  });
  const [playing] = useState(false);
  // const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [deviceHeight - YOUTUBE_VIDEO_HEIGHT, '100%'], []);

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
      fetchData();
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (loading) {
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
          {item?.name}
        </TextEle>
        <TextEle
          variant="caption"
          style={{
            color: 'gray',
            flexDirection: 'row',
            marginVertical: 4,
          }}>
          {item?.cookingLevel}
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
                <BottomSheetView
                  style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Rating
                    onPress={onRatingpress}
                    rating={rating}
                    length={5}
                    totalRating={courseDetail?.rattings || 0}
                  />
                  <ShareButton />
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default CourseDetailsBought;
