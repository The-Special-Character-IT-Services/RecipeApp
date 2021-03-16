import React, { useContext, useState } from 'react';
import { ScrollView, View, Image, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useSWR from 'swr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import { UserContext } from '@context/userContext';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from '../../components/Search';
import RecentlyAdd from '../../components/RecentlyAdd';
import SearchCuisine from '../../components/SearchCuisine';
import TextEle from '../../components/TextEle';

const arr = ['Trending', 'Recently Added ', 'Rice Items', 'Sweets', 'Salads'];

const Search = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useContext(UserContext);
  const { data } = useSWR([
    coursesQuery({
      pageIndex: 0,
      limit: 5,
      sort: 'updated_at:DESC',
      userId: user?.id,
    }),
  ]);
  const [text, setText] = useState('');

  // const handler = useCallback(debounce(loadSearch, 2000), []);

  const onChangeText = val => {
    setText(val);
  };
  return (
    <KeyboardAvoidingView
      style={{
        paddingTop: insets.top,
      }}>
      <SearchBar onChangeText={onChangeText} value={text} clearText={() => setText('')} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
        horizontal>
        {arr.map((x, i) => (
          <View
            key={i}
            style={{
              paddingHorizontal: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.text,
              marginHorizontal: 5,
              justifyContent: 'center',
              height: 40,
            }}>
            <TextEle>{x}</TextEle>
          </View>
        ))}
      </ScrollView>

      {text <= 0 ? (
        <ScrollView>
          <RecentlyAdd />
          <SearchCuisine />
        </ScrollView>
      ) : (
        // <ScrollView
        //   style={{
        //     marginVertical: 10,
        //     marginHorizontal: 10,
        //     flexDirection: 'row',
        //   }}>
        <FlatList
          data={text.length >= 3 ? data?.courses.filter(x => x.name.includes(text)) : data?.courses}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
              }}>
              <Image
                source={{ uri: item?.image?.url }}
                style={{ height: 50, width: 50, borderRadius: 5 }}
              />
              <TextEle
                variant="body1"
                style={{
                  color: colors.text,
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 3,
                }}>
                {item.name}
              </TextEle>
            </View>
          )}
          removeClippedSubviews
        />
        // {data?.courses.map(item => (
        //   <View
        //     style={{
        //       flexDirection: 'row',
        //       marginVertical: 10,
        //       marginHorizontal: 10,
        //     }}>
        //     <Image
        //       source={{ uri: item.image.url }}
        //       style={{ height: 50, width: 50, borderRadius: 5 }}
        //     />
        //     <TextEle
        //       variant="body1"
        //       style={{
        //         color: colors.text,
        //         flexDirection: 'row',
        //         marginHorizontal: 10,
        //         marginVertical: 3,
        //       }}>
        //       {item.name}
        //     </TextEle>
        //   </View>
        // ))}
        // </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Search;
