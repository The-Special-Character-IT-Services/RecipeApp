import React, { useContext } from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
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
  // const [recipes, setRecipes] = useState(data);
  // useEffect(() => {
  //   setRecipes([...recipes, { isEmpty: true }]);
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const isPurchased = data?.courses.purchase_details.some(
  //   x => x.course.id === data?.courses.id && x.status === 'purchased',
  // );

  const renderItem = ({ item }) => (
    <View
      key={item?.id}
      style={{
        flex: 1,
      }}>
      {item.purchase_details.some(x => x.course.id === item.id && x.status === 'purchased') && (
        <>
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
              justifyContent: 'space-between',
              paddingBottom: 15,
            }}>
            <TextEle
              numberOfLines={1}
              variant="body2"
              style={{ color: colors.text, paddingLeft: 5 }}>
              {item?.name}
            </TextEle>
            <View>
              <StarIcon fill={colors.text} />
              {/* <TextEle variant="body2" style={{ color: colors.text }}>
                    {item.rating}
                  </TextEle> */}
            </View>
          </View>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      data={data?.courses}
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={{ marginHorizontal: 20 }}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};

export default MyRecipes;
