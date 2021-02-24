import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Dimensions, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Config from 'react-native-config';
import axios from 'axios';
import TextEle from '@components/TextEle';
import { showErrorToast } from '@utils/';

const { width: deviceWidth } = Dimensions.get('window');

const YOUTUBE_API_PART = 'snippet,contentDetails,statistics';

const YoutubeVideo = ({ route }) => {
  const { videoId } = route.params;
  const [youtubeData, setYoutubeData] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const query = `part=${YOUTUBE_API_PART}&key=${Config.YOUTUBE_API_KEY}&id=${videoId}`;
      const res = await axios.get(`${Config.YOUTUBE_VIDEO_API}/videos?${query}`);
      setYoutubeData(res.data);
    } catch (error) {
      showErrorToast(error);
    }
  }, [videoId]);

  useEffect(() => {
    loadData();
    return () => {
      setYoutubeData(null);
    };
  }, [loadData]);

  return (
    <View style={{ flex: 1 }}>
      <YoutubePlayer height={(deviceWidth / 16) * 9} play={false} videoId={videoId} />
      <ScrollView style={{ margin: 10 }}>
        <TextEle>{youtubeData?.items[0]?.snippet?.title}</TextEle>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextEle>{`${youtubeData?.items[0]?.statistics?.viewCount} Views`}</TextEle>
          <TextEle>{`${youtubeData?.items[0]?.statistics?.likeCount} Likes`}</TextEle>
        </View>
        <TextEle>{youtubeData?.items[0]?.snippet?.description}</TextEle>
      </ScrollView>
    </View>
  );
};

YoutubeVideo.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default YoutubeVideo;
