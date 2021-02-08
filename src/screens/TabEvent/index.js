import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Image from 'react-native-fast-image';
import { useSWRInfinite } from 'swr';
import { View, Dimensions } from 'react-native';
import getCoursesApi from '@hooks/useCoursesApiHook';
import { RectButton } from 'react-native-gesture-handler';
import TextEle from '@components/TextEle';
import food1 from '../../assets/images/food1.jpg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const ITEM_HEIGHT = 100;

const TabEvent = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { data, size, setSize } = useSWRInfinite(getCoursesApi);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '80%'], []);

  const onEventPress = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({ item }) => (
      <RectButton
        rippleColor={colors.text}
        onPress={onEventPress}
        key={item.id}
        style={{
          marginVertical: 10,
          backgroundColor: colors.card,
        }}>
        <Image
          source={{
            uri: item.image.url,
          }}
          style={{
            aspectRatio: 16 / 9,
          }}
        />
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <TextEle style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</TextEle>
          <TextEle style={{ fontWeight: 'bold', fontSize: 20 }}>{item.caption}</TextEle>
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

  const ListHeaderComponent = () => (
    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
      <TextEle
        style={{
          fontSize: 27,
          fontWeight: 'bold',
          flex: 1,
          marginVertical: 20,
        }}>
        Buy Online Classes
      </TextEle>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={insets.top}>
        <BottomSheetFlatList
          data={data?.flat() || []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={{ flex: 1, backgroundColor: colors.background, borderRadius: 15 }}
          getItemLayout={getItemLayout}
          removeClippedSubviews
          initialNumToRender={5}
          maxToRenderPerBatch={6}
          windowSize={10}
          onEndReached={() => setSize(size + 1)}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={ListHeaderComponent}
        />
      </BottomSheet>
    </View>
  );
};

TabEvent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabEvent;
