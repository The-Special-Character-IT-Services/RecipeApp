import Carousal from '@components/Carousal';
import TextEle from '@components/TextEle';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, View } from 'react-native';

const HomeList = ({ title, data, onPressViewAll, onRecipePress }) => {
  const { colors } = useTheme();
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
      <Carousal data={data} onRecipePress={onRecipePress} onPressViewAll={onPressViewAll} />
    </>
  );
};

HomeList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf().isRequired,
  onPressViewAll: PropTypes.func.isRequired,
};

export default HomeList;
