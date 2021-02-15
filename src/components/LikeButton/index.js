import { UserContext } from '@context/userContext';
import { likesQuery } from '@hooks/useLikesApiHook';
import { useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';
import axios from '../../utils/axios';

const LikeButton = ({ courseId }) => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data, mutate } = useSWR([likesQuery(user?.id, courseId)]);

  const onLikePress = async () => {
    try {
      console.log('data?.likes?.length', data?.likes?.length);
      if (data?.likes?.length === 0) {
        await axios.post('likes', {
          user: user.id,
          course: courseId,
        });
      } else {
        await axios.delete(`likes/${data.likes[0].id}`);
      }
      mutate([likesQuery(user.id, courseId)]);
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 28 ~ onLikePress ~ error', error);
    }
  };

  const animation = useRef(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      if (data?.likes?.length) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (data?.likes?.length) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [data?.likes?.length]);

  return (
    <Pressable
      style={{
        height: 50,
        width: 50,
        borderRadius: 45,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onLikePress}>
      {/* <Icon
        name={data?.likes?.length === 0 ? 'heart-outline' : 'heart-sharp'}
        size={25}
        color={colors.primary}
      /> */}
      <LottieView
        ref={animation}
        style={{ height: 50, width: 50 }}
        source={require('@assets/lottie/44921-like-animation.json')}
        autoPlay={false}
        loop={false}
      />
    </Pressable>
  );
};

export default LikeButton;
