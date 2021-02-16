/* eslint-disable react-native/no-inline-styles */
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View, StatusBar, Dimensions, Platform } from 'react-native';
import { deviceWidth, deviceHeight } from '@utils/index';
// import { format, subDays } from 'date-fns';
import { useHeaderHeight } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import useSWR from 'swr';
import { courseQuery } from '@hooks/useCoursesApiHook';
import Loading from '@components/loading';
import TextEle from '../../components/TextEle';

const subt = `Recipes in this write-up are protected by copyright law. Reproduction and distribution
of the same without a written consent from Studio D’ Food Couture is prohibited. ©
Studio De Food Couture `;

const YOUTUBE_VIDEO_HEIGHT = (deviceWidth / 16) * 9;

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const CourseDetailsBought = ({ route }) => {
  const { id, userId } = route.params;
  const { colors } = useTheme();
  const { data, isValidating } = useSWR([courseQuery(id, userId)]);
  const [playing, setPlaying] = useState(false);
  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [deviceHeight - YOUTUBE_VIDEO_HEIGHT - headerHeight, '100%'], [
    headerHeight,
  ]);

  if (isValidating) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <YoutubePlayer
        play={playing}
        height={YOUTUBE_VIDEO_HEIGHT}
        videoId={data?.course?.promoVideoYoutubeId}
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
        <BottomSheetScrollView
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: colors.background,
          }}>
          <View style={{ marginBottom: 100 }}>
            <TextEle>Recipes:-</TextEle>
          </View>
          <FlatList
            data={data?.course}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            scrollEventThrottle={16}
            snapToInterval={CARD_WIDTH}
            renderToHardwareTextureAndroid
            contentContainerStyle={[
              {
                paddingHorizontal: Platform.OS === 'android' ? cardInset : 0,
              },
            ]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}>
                  <Image
                    source={{ uri: item.image.url }}
                    style={{ height: 50, width: 50, borderRadius: 5 }}
                  />
                  <TextEle
                    variant="body1"
                    style={{
                      color: colors.text,
                      flexDirection: 'row',
                      marginHorizontal: 10,
                      marginVertical: 3,
                    }}>
                    {item?.name}
                  </TextEle>
                </View>
              );
            }}
            removeClippedSubviews
            keyExtractor={item => `${item?.id}`}
          />
        </BottomSheetScrollView>
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
