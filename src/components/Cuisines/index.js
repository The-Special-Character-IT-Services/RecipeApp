/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React, { memo } from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import PropTypes from 'prop-types';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import useFetchData from '@hooks/useFetchData';
import { cuisinesQuery } from '@hooks/useCuisinesApiHook';
import Loading from '@components/loading';
import TextEle from '../TextEle';

const Cuisine = ({ onCuisinePress }) => {
  const { data, loading } = useFetchData({ query: cuisinesQuery });

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }
  return (
    <View>
      <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
        <TextEle variant="body1" style={{ fontWeight: 'bold', paddingLeft: 10 }}>
          Popular Cuisine
        </TextEle>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {data?.cuisines?.map(item => (
          <View
            key={item.id}
            style={{
              paddingLeft: 5,
              marginVertical: 5,
              marginHorizontal: 5,
              alignItems: 'center',
            }}>
            <RectButton onPress={() => onCuisinePress(item)}>
              <Image
                style={{
                  borderRadius: 5,
                  height: 70,
                  width: 70,
                }}
                source={{ uri: item?.image?.formats.thumbnail.url }}
              />
            </RectButton>
            <TextEle variant="caption">{item.name}</TextEle>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

Cuisine.propTypes = {
  onCuisinePress: PropTypes.func.isRequired,
};

export default memo(Cuisine);
