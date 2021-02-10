import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View, StatusBar } from 'react-native';
import { deviceWidth, deviceHeight } from '@utils/index';
import RAButton1 from '@components/RAButton1';
import { useHeaderHeight } from '@react-navigation/stack';
import useSWR from 'swr';
import { courseQuery } from '@hooks/useCoursesApiHook';
import TextEle from '../../components/TextEle';
// import BreadWiches from './BreadWiches';

const subt = `Recipes in this write-up are protected by copyright law. Reproduction and distribution
of the same without a written consent from Studio D’ Food Couture is prohibited. ©
Studio De Food Couture `;

const YOUTUBE_VIDEO_HEIGHT = (deviceWidth / 16) * 9;

const CourseDetails = ({ route }) => {
  const { id, userId } = route.params;
  const { colors } = useTheme();
  const { data } = useSWR([courseQuery(id, userId)]);
  const [playing, setPlaying] = useState(false);
  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [deviceHeight - YOUTUBE_VIDEO_HEIGHT - headerHeight, '100%'], [
    headerHeight,
  ]);

  console.log(data);

  const handleSheetChanges = useCallback(index => {
    console.log('index', index);
    setPlaying(index === 0);
  }, []);

  if (!data?.course) {
    return (
      <View>
        <TextEle>Loading</TextEle>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <YoutubePlayer
        play={playing}
        height={YOUTUBE_VIDEO_HEIGHT}
        videoId={item.promoVideoYoutubeId}
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
        )}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: colors.background,
          }}>
          <TextEle style={{}} variant="title">
            Key Points:-
          </TextEle>
          <View>
            <View key={data?.course.id}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextEle key={data?.course.id} variant="body2" style={{ paddingVertical: 10 }}>
                  {data?.course.name}
                </TextEle>
                <TextEle variant="body2" style={{ paddingVertical: 10, color: 'gray', width: 120 }}>
                  {data?.course.launchDate}
                </TextEle>
              </View>
              <View style={{ height: 1, width: 330, backgroundColor: 'gray' }} />
            </View>
            <TextEle variant="caption" style={{ marginVertical: 20 }}>
              {subt}
            </TextEle>
          </View>
          <TextEle>Varieties:-</TextEle>
          <TextEle variant="body1" style={{ textAlign: 'justify', width: 400 }}>
            {data?.course.description}
          </TextEle>
        </BottomSheetScrollView>
      </BottomSheet>
      <RAButton1
        style={{ position: 'absolute', bottom: 10, width: '100%' }}
        variant="fill"
        text="Buy For 249"
        onPress={() => {}}
      />
    </View>
  );
};

CourseDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default CourseDetails;
