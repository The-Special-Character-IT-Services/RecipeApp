import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getCoursesApi, { coursesQuery } from '@hooks/useCoursesApiHook';
import Image from 'react-native-fast-image';
import useSWR, { useSWRInfinite } from 'swr';
import { View, Dimensions } from 'react-native';
import { UserContext } from '@context/userContext';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import TextEle from '@components/TextEle';
import food1 from '../../assets/images/food1.jpg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const ITEM_HEIGHT = 100;

const TabEvent = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);

  const insets = useSafeAreaInsets();
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
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '80%'], []);

  const onEventPress = useCallback(() => {}, []);

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
          style={{ height: 200, width: 320, borderRadius: 20 }}
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

  return (
    <View style={{ justifyContent: 'flex-end' }}>
      <Image
        style={{
          height: windowHeight * 0.5,
          width: windowWidth,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        source={food1}
      />
      <View style={{ flex: 1 }}>
        <BottomSheet
          ref={bottomSheetRef}
          initialSnapIndex={0}
          snapPoints={snapPoints}
          handleComponent={() => null}
          topInset={insets.top}>
          <BottomSheetView
            style={{
              flex: 1,
              // flexDirection: 'row',
              paddingHorizontal: 20,
              backgroundColor: colors.background,
            }}>
            <TextEle
              style={{
                fontSize: 27,
                fontWeight: 'bold',
                // flex: 1,
                marginVertical: 20,
              }}>
              Buy Online Classes
            </TextEle>
            {/* </BottomSheetView> */}
            <BottomSheetScrollView
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
              }}>
              <FlatList
                data={data?.courses || []}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={{
                  backgroundColor: colors.background,
                  borderRadius: 15,
                }}
                getItemLayout={getItemLayout}
                removeClippedSubviews
                initialNumToRender={5}
                maxToRenderPerBatch={6}
                windowSize={10}
                onEndReached={() => setSize(size + 1)}
                onEndReachedThreshold={0.5}
              />
            </BottomSheetScrollView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
};

TabEvent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabEvent;
