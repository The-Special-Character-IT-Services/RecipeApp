/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import Loading from '@components/loading';
import PropTypes from 'prop-types';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import Lottie from '../../components/NodataLottie';
import SearchBar from '../../components/Search';
import TextEle from '../../components/TextEle';

const ITEM_HEIGHT = 100;

const FilterList = ({ route, navigation }) => {
  const { where, userId } = route.params;
  const { data, loading, error } = useInfiniteScroll({
    callback: coursesQuery,
    callbackProps: {
      sort: 'updated_at:DESC',
      where,
      userId,
    },
    limit: 10,
    response: 'courses',
  });
  const insets = useSafeAreaInsets();
  // const { data, isValidating, size, setSize } = useSWRInfinite((...props) =>
  //   getInfiniteFilteredCourses(...props, where, userId),
  // );

  // const { data, isValidating } = useSWR([coursesCategoryQuery(0, 5, 'updated_at:DESC', where)]);
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const onChangeText = val => {
    setText(val);
  };
  const keyExtractor = useCallback(item => `${item?.id}`, []);

  const renderItem = useCallback(
    ({ item, user }) => (
      <Pressable
        style={{
          flexDirection: 'row',
          height: ITEM_HEIGHT,
        }}
        onPress={() => {
          navigation.navigate('CourseDetails', { id: item?.id, userId: user?.id });
        }}>
        <Image
          source={{ uri: item?.image?.formats?.thumbnail?.url || item?.image?.url }}
          style={{ height: ITEM_HEIGHT, width: ITEM_HEIGHT, borderRadius: 5 }}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <TextEle variant="body1">{item.name}</TextEle>
          <TextEle variant="body1">{item.caption}</TextEle>
        </View>
      </Pressable>
    ),
    [navigation],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  if (!loading && data.length === 0) {
    return (
      <View style={{ alignItems: 'center' }}>
        <Lottie />
      </View>
    );
  }

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 10 }}>
        <SearchBar onChangeText={onChangeText} text={text} />
      </View>
      <FlatList
        contentContainerStyle={{
          paddingBottom: insets.bottom + 15,
          marginHorizontal: 20,
        }}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        ListFooterComponent={() => {
          if (loading) {
            return <Loading />;
          }
          return null;
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              marginVertical: 10,
            }}
          />
        )}
        onEndReached={() => {
          // if (distanceFromEnd < 0) return;
          // setPage(page + 1);
        }}
        onEndReachedThreshold={0.9}
      />
    </View>
  );
};

FilterList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default FilterList;
