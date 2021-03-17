import { useTheme } from '@react-navigation/native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import getCoursesApi, { coursesQuery } from '@hooks/useCoursesApiHook';
import Image from 'react-native-fast-image';
import useSWR, { useSWRInfinite } from 'swr';
import LottieView from 'lottie-react-native';
import { Pressable, View } from 'react-native';
import { UserContext } from '@context/userContext';
import Loading from '@components/loading';
import { FlatList } from 'react-native-gesture-handler';
import LikeButton from '@components/LikeButton';
import TextEle from '@components/TextEle';
import { format } from 'date-fns';
import SearchBar from '../../components/Search';

const ITEM_HEIGHT = 200;

const TabEvent = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);

  const { data, loading } = useSWR([
    coursesQuery({
      pageIndex: 0,
      limit: 7,
      sort: 'launchDate:DESC',
      userId: user?.id,
    }),
  ]);
  const { size, setSize } = useSWRInfinite(getCoursesApi);

  const onEventPress = useCallback(() => {}, []);

  const [text, setText] = useState('');

  const onChangeText = val => {
    setText(val);
  };

  const animation = useRef(null);

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
      return (
        <>
          <View style={{ alignItems: 'center' }}>
            <LottieView
              ref={animation}
              source={require('@assets/lottie/9923-box-empty.json')}
              style={{ height: 600, width: 600 }}
              autoPlay
              loop
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background,
                bottom: 150,
              }}>
              <TextEle variant="error" style={{ color: colors.primary, textAlign: 'center' }}>
                Sorry!!
              </TextEle>
              <TextEle variant="error1" style={{ color: colors.primary, textAlign: 'center' }}>
                No data available
              </TextEle>
            </View>
          </View>
        </>
      );
    },
    [TodayDate, colors.card, colors.primary, text, colors.background, onEventPress],
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
