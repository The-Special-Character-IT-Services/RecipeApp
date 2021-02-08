// import { useTheme } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import Image from 'react-native-fast-image';
import axios from 'axios';
import Config from 'react-native-config';
import TextEle from '@components/TextEle';
import { RectButton } from 'react-native-gesture-handler';
import { deviceWidth } from '@utils/index';
import Form from '@components/Form';
import { initialValues, youtubeSearchForm } from './fields';

const YOUTUBE_API_PART = 'snippet,id';
const YOUTUBE_MAX_RESULTS = 5;
const ITEM_HEIGHT = (deviceWidth / 16) * 9 + 60;

const TabYoutube = ({ navigation }) => {
  //   const { colors } = useTheme();
  const [youtubeData, setYoutubeData] = useState(null);

  const loadData = useCallback(async ({ pageToken, search, order = 'date' }) => {
    try {
      let query = `part=${YOUTUBE_API_PART}&maxResults=${YOUTUBE_MAX_RESULTS}&key=${Config.YOUTUBE_API_KEY}&channelId=${Config.YOUTUBE_CHANNEL_ID}&order=${order}`;
      if (pageToken) {
        query += `&pageToken=${pageToken}`;
      }
      if (search) {
        query += `&q=${search}`;
      }
      const res = await axios.get(`${Config.YOUTUBE_VIDEO_API}/search?${query}`);
      setYoutubeData(prevYoutubeData => ({
        ...res.data,
        items: [...(prevYoutubeData?.items || []), ...res.data.items],
      }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadData({});
    return () => {
      setYoutubeData();
    };
  }, [loadData]);

  const renderItem = useCallback(
    ({ item }) => (
      <RectButton
        style={{ height: ITEM_HEIGHT }}
        onPress={() => {
          navigation.navigate('YoutubeVideo', {
            videoId: item?.id?.videoId,
          });
        }}>
        <Image
          source={{
            uri: item?.snippet?.thumbnails?.medium?.url,
          }}
          style={{
            aspectRatio: 16 / 9,
          }}
        />
        <TextEle numberOfLines={2}>{item?.snippet?.title}</TextEle>
      </RectButton>
    ),
    [navigation],
  );

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback(item => `${item?.etag}`, []);

  const loadMore = useCallback(() => {
    if (youtubeData.nextPageToken) loadData({ pageToken: youtubeData.nextPageToken });
  }, [youtubeData?.nextPageToken, loadData]);

  const onSubmit = useCallback(
    values => {
      if (values && values.search) loadData({ search: values.search });
    },
    [loadData],
  );

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Form initialValues={initialValues} fields={youtubeSearchForm} onSubmit={onSubmit} />
      <FlatList
        data={youtubeData?.items || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

TabYoutube.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabYoutube;
