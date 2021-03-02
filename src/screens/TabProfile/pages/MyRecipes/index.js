import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import TextEle from '@components/TextEle';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import { UserContext } from '@context/userContext';
import useSWR from 'swr';
import { showErrorToast } from '@utils/';
import Loading from '@components/loading';

const MyRecipes = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery({ pageIndex: 0, limit: 5, sort: 'updated_at:DESC', userId: user?.id }),
  ]);

  // if (!data) {
  //   return <Loading />;
  // }

  const renderCourses = ({ item, index }) => {
    try {
      return (
        <View
          key={item?.id}
          style={{
            flex: 1,
            flexDirection: 'column',
            marginRight: index % 2 === 0 ? 10 : 0,
          }}>
          {Object.keys(item).length !== 0 ? (
            <View>
              <Image
                source={{ uri: item?.image?.formats?.medium?.url }}
                resizeMode="cover"
                style={{
                  flex: 1,
                  height: 230,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  paddingBottom: 10,
                }}>
                <TextEle
                  numberOfLines={2}
                  variant="body2"
                  style={{ color: colors.text, paddingLeft: 5 }}>
                  {item?.name}
                </TextEle>
                {/* <View>
                      <StarIcon fill={colors.text} />
                    </View> */}
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      );
    } catch (err) {
      return showErrorToast(err);
    }
  };

  const filteredData = data?.courses?.filter(x => x.purchase_details.length > 0) || [];

  const flatListData = filteredData?.length % 2 === 0 ? filteredData : [...filteredData, {}];

  return (
    <FlatList
      data={flatListData || []}
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={{ marginHorizontal: 20 }}
      renderItem={renderCourses}
      numColumns={2}
    />
  );
};
export default MyRecipes;
