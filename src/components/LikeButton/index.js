import { UserContext } from '@context/userContext';
import { likesQuery } from '@hooks/useLikesApiHook';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';
import axios from '../../utils/axios';

const LikeButton = ({ courseId }) => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data, mutate } = useSWR([likesQuery(user.id, courseId)]);

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

  return (
    <Pressable style={{ padding: 10, zIndex: 10 }} onPress={onLikePress}>
      <Icon
        name={data?.likes?.length === 0 ? 'heart-outline' : 'heart-sharp'}
        size={25}
        color={colors.primary}
      />
    </Pressable>
  );
};

export default LikeButton;
