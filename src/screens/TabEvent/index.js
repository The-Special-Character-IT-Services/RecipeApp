import { useTheme } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import getCoursesApi, { coursesQuery } from '@hooks/useCoursesApiHook';
import Image from 'react-native-fast-image';
import useSWR, { useSWRInfinite } from 'swr';
import { View } from 'react-native';
import { UserContext } from '@context/userContext';
import Loading from '@components/loading';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import TextEle from '@components/TextEle';
import SearchBar from '../../components/Search';
import LikeButton from '@components/LikeButton';

const ITEM_HEIGHT = 200;

const TabEvent = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);

  const { data } = useSWR([
    coursesQuery({
      pageIndex: 0,
      limit: 7,
      sort: 'updated_at:DESC',
      where: `{like_event:{user:${user?.id}}}`,
      userId: user?.id,
    }),
  ]);
  const { size, setSize } = useSWRInfinite(getCoursesApi);

  const onEventPress = useCallback(() => {}, []);

  const [text, setText] = useState('');

  const onChangeText = val => {
    setText(val);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <RectButton
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
      </RectButton>
    ),
    [onEventPress, colors],
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
  if (!data) {
    return <Loading />;
  }
  return (
    <View
      style={{
        flex: 1,
        // paddingHorizontal: 20,
      }}>
      <View style={{}}>
        <SearchBar onChangeText={onChangeText} value={text} clearText={() => setText('')} />
      </View>
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
