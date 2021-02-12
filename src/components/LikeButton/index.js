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
  console.log('🚀 ~ file: index.js ~ line 13 ~ LikeButton ~ data', data);

  const onLikePress = async () => {
    try {
      console.log('data?.courses?.length', data?.courses?.length);
      if (data?.courses?.length === 0) {
        const res = await axios.post('likes', {
          user: user.id,
          course: courseId,
        });
        console.log('🚀 ~ file: index.js ~ line 23 ~ onLikePress ~ res', res);
      } else {
        console.log(`likes/${data.courses[0].id}`);
        const res = await axios.delete(`likes/${data.courses[0].id}`);
        console.log('🚀 ~ file: index.js ~ line 28 ~ onLikePress ~ res', res);
      }
      mutate([likesQuery(user.id, courseId)]);
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 28 ~ onLikePress ~ error', error);
    }
  };

  return (
    <Pressable style={{ padding: 10, zIndex: 10 }} onPress={onLikePress}>
      <Icon
        name={data?.courses?.length === 0 ? 'heart-outline' : 'heart-sharp'}
        size={25}
        color={colors.primary}
      />
    </Pressable>
  );
};

export default LikeButton;
