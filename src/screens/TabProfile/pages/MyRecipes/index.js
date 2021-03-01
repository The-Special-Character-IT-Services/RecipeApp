import React, { useContext } from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';
import { FlatList, RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import TextEle from '@components/TextEle';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import useSWR from 'swr';
// import data from './data';
import { UserContext } from '@context/userContext';
import StarIcon from '../../../../assets/icons/star-icon.svg';

const MyRecipes = () => {
  const { colors } = useTheme();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery({ pageIndex: 0, limit: 5, sort: 'updated_at:DESC', userId: user?.id }),
  ]);

  const filteredData = data?.courses?.filter(x => x.purchase_details.length > 0);

  const flatListData = filteredData?.length % 2 === 0 ? filteredData : [...filteredData, {}];

  return (
    <FlatList
      data={flatListData}
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={{ marginHorizontal: 20 }}
      renderItem={({ item, index }) => (
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
                  width: undefined,
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
      )}
      numColumns={2}
    />
  );
};

export default MyRecipes;
