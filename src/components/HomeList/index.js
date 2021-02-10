import Carousal from '@components/Carousal';
import TextEle from '@components/TextEle';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, View } from 'react-native';
import useSWR from 'swr';

const HomeList = ({ title, onPressViewAll, newData, onRecipePress }) => {
  const { colors } = useTheme();
  const { data } = useSWR([coursesQuery(0, 5, 'updated_at:DESC')]);
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
      {data?.courses.map(item => (
        <Carousal
          data={newData}
          onRecipePress={() => onRecipePress(item)}
          onPressViewAll={onPressViewAll}
        />
      ))}
    </>
  );
};

HomeList.propTypes = {
  title: PropTypes.string.isRequired,
  onPressViewAll: PropTypes.func.isRequired,
};

export default HomeList;
