import Carousal from '@components/Carousal';
import TextEle from '@components/TextEle';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, View } from 'react-native';
import useSWR from 'swr';

const HomeList = ({ title, onPressViewAll, onRecipePress, userId }) => {
  const { colors } = useTheme();
  const { data } = useSWR([
    coursesQuery({
      pageIndex: 0,
      limit: 5,
      sort: 'updated_at:DESC',
      userId,
    }),
  ]);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <TextEle variant="h1">{title}</TextEle>
        <Pressable onPress={onPressViewAll}>
          <TextEle variant="h2" style={{ color: colors.primary }}>
            View All
          </TextEle>
        </Pressable>
      </View>
      <Carousal
        data={data?.courses || []}
        onRecipePress={item => onRecipePress(item)}
        onPressViewAll={onPressViewAll}
      />
    </>
  );
};

HomeList.propTypes = {
  title: PropTypes.string.isRequired,
  onPressViewAll: PropTypes.func.isRequired,
  onRecipePress: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default HomeList;
