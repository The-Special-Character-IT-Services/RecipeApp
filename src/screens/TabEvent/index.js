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
          marginVertical: 5,
          backgroundColor: colors.background,
        }}>
        <Image
          source={{
            uri: item.image.url,
          }}
          style={{ height: ITEM_HEIGHT, width: ITEM_HEIGHT * 1.4, borderRadius: 5 }}
        />
        <View style={{ paddingHorizontal: 10, paddingVertical: 5, flex: 1 }}>
          <TextEle style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</TextEle>
          {/* <TextEle style={{ fontWeight: 'bold', fontSize: 20 }}>{item.caption}</TextEle> */}
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
        backgroundColor: colors.background,
        marginVertical: 10,
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
          alignItems: 'center',
          borderRadius: 15,
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
