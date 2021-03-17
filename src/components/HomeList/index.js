import Carousal from '@components/Carousal';
import Loading from '@components/loading';
import TextEle from '@components/TextEle';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import useFetchData from '@hooks/useFetchData';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, View } from 'react-native';
import ListItem from './ListItem';

const HomeList = ({ title, onPressViewAll, onRecipePress, userId, sort, where }) => {
  const { colors } = useTheme();
  const { data, loading } = useFetchData({
    query: coursesQuery({
      pageIndex: 0,
      limit: 5,
      sort,
      userId,
      where,
    }),
  });

  if (loading) {
    return (
      <View style={{ flex: 1, height: 400 }}>
        <Loading />
      </View>
    );
  }
  if (!data) {
    return null;
  }
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <TextEle variant="header2">{title}</TextEle>
        <Pressable style={{ paddingTop: 7 }} onPress={onPressViewAll}>
          <TextEle variant="subTitle2" style={{ color: colors.primary }}>
            View All
          </TextEle>
        </Pressable>
      </View>
      <Carousal
        data={data?.courses || []}
        renderItem={(item, cardWidth) => (
          <ListItem item={item} onRecipePress={() => onRecipePress(item)} cardWidth={cardWidth} />
        )}
        ListFooterComponent={cardWidth => (
          <Pressable
            onPress={onPressViewAll}
            style={{
              width: cardWidth,
              height: 225,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.card,
              borderRadius: 20,
            }}>
            <TextEle style={{ color: colors.primary }}>View All</TextEle>
          </Pressable>
        )}
        keyExtractor={item => `${item.id}`}
      />
    </>
  );
};

HomeList.propTypes = {
  title: PropTypes.string.isRequired,
  onPressViewAll: PropTypes.func.isRequired,
  onRecipePress: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  sort: PropTypes.string,
  where: PropTypes.string,
};

HomeList.defaultProps = {
  sort: '',
  where: '',
};

export default HomeList;
