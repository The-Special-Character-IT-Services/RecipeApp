/* eslint-disable jsx-control-statements/jsx-use-if-tag */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useRef } from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import TextEle from '@components/TextEle';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import { UserContext } from '@context/userContext';
import { showErrorToast } from '@utils/';
import Loading from '@components/loading';
import useFetchData from '@hooks/useFetchData';

const MyRecipes = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data } = useFetchData({
    query: coursesQuery({ pageIndex: 0, limit: 5, sort: 'updated_at:DESC', userId: user?.id }),
  });
  const animation = useRef(null);

  if (!data) {
    return <Loading />;
  }

  const renderCourses = ({ item, index }) => {
    try {
      return (
        <View
          key={item?.id}
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: index === 0 || index === 1 ? 20 : 0,
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

  if (filteredData.length === 0) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 300 }}>
        <LottieView
          ref={animation}
          source={require('@assets/lottie/9923-box-empty.json')}
          style={{ height: 600, width: 600 }}
          autoPlay
          loop
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
            bottom: 150,
          }}>
          <TextEle variant="error" style={{ color: colors.primary, textAlign: 'center' }}>
            Sorry!!
          </TextEle>
          <TextEle variant="error1" style={{ color: colors.primary, textAlign: 'center' }}>
            No data available
          </TextEle>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={flatListData || []}
      keyExtractor={item => item.id}
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={{ marginHorizontal: 20 }}
      renderItem={renderCourses}
      numColumns={2}
    />
  );
};
export default MyRecipes;
