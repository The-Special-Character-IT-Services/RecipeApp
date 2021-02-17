/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { ScrollView, View, ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useSWR, { useSWRInfinite } from 'swr';
import { getInfiniteFilteredCourses } from '@hooks/useCoursesApiHook';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';
import TextEle from '../../components/TextEle';

const ITEM_HEIGHT = 100;

const FilterList = ({ route }) => {
  const { where } = route.params;
  const insets = useSafeAreaInsets();
  const { data, isValidating, mutate, size, setSize } = useSWRInfinite(getInfiniteFilteredCourses);

  // const { data, isValidating } = useSWR([coursesCategoryQuery(0, 5, 'updated_at:DESC', where)]);
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const onChangeText = val => {
    setText(val);
  };

  const keyExtractor = useCallback(item => `${item?.id}`, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          height: ITEM_HEIGHT,
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
      </View>
    ),
    [],
  );

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  // const loadMore = useCallback(() => {
  //   setSize(size + 1);
  // }, [size, setSize]);

  return (
    <View>
      <View style={{ paddingTop: 10 }}>
        <SearchBar onChangeText={onChangeText} text={text} />
      </View>
      <FlatList
        contentContainerStyle={{
          margin: 15,
        }}
        data={data?.reduce((p, c) => [...p, ...c.courses], []) || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        ListFooterComponent={() => {
          if (isValidating) {
            return <ActivityIndicator animating size="large" color={colors.pr} />;
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
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default FilterList;
