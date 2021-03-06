import { useTheme } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import getCoursesApi, { coursesQuery } from '@hooks/useCoursesApiHook';
import Image from 'react-native-fast-image';
// import { useSWRInfinite } from 'swr';
// import LottieView from 'lottie-react-native';
import { Pressable, View } from 'react-native';
import { UserContext } from '@context/userContext';
import Loading from '@components/loading';
import { FlatList } from 'react-native-gesture-handler';
import LikeButton from '@components/LikeButton';
import Lottie from '@components/NodataLottie';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import TextEle from '@components/TextEle';
import { format } from 'date-fns';
import SearchBar from '../../components/Search';

const ITEM_HEIGHT = 200;

const TabEvent = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);

  // const { data, loading } = useFetchData({
  //   query: coursesQuery({
  //     pageIndex: 0,
  //     limit: 7,
  //     sort: 'launchDate:DESC',
  //     userId: user?.id,
  //   }),
  // });
  // const { size, setSize } = useSWRInfinite(getCoursesApi);
  const { data, loading, error } = useInfiniteScroll({
    callback: coursesQuery,
    callbackProps: {
      sort: 'launchDate:DESC',
      userId: user?.id,
    },
    limit: 5,
    response: 'courses',
  });

  const onEventPress = useCallback(() => {}, []);

  const [text, setText] = useState('');

  const onChangeText = val => {
    setText(val);
  };

  // const animation = useRef(null);

  const TodayDate = format(new Date(), 'yyyy-MM-dd');

  const renderItem = useCallback(
    ({ item }) => {
      if (format(new Date(item?.launchDate), 'yyyy-MM-dd') >= TodayDate) {
        return (
          <>
            <View>
              <SearchBar onChangeText={onChangeText} value={text} clearText={() => setText('')} />
            </View>

            <Pressable
              rippleColor={colors.card}
              onPress={onEventPress}
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
            </Pressable>
          </>
        );
      }
    },
    [TodayDate, colors.card, text, colors.background, onEventPress],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback(item => `${item?.id}`, []);
  if (loading) {
    return <Loading />;
  }

  if (!data || !data?.courses || data?.courses?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Lottie />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        // paddingHorizontal: 20,
      }}>
      <FlatList
        data={data?.courses || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          backgroundColor: colors.background,
          marginHorizontal: 10,
        }}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={6}
        // windowSize={10}
        onEndReached={() => setSize(size + 1)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

TabEvent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabEvent;
