/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Dimensions, Platform } from 'react-native';
import TextEle from '../TextEle';
import data from './data';
import ListItem from './ListItem';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.5;

const SearchCuisine = () => {
  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current.scrollToOffset({
      animated: false,
      offset: -cardInset,
    });
  }, []);

  return (
    <>
      <View>
        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <TextEle variant="body2" style={{ fontWeight: 'bold', paddingLeft: 10 }}>
            Search by Cuisine
          </TextEle>
        </View>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          scrollEventThrottle={16}
          snapToInterval={CARD_WIDTH}
          renderToHardwareTextureAndroid
          contentInset={{
            top: 0,
            left: cardInset,
            bottom: 0,
            right: cardInset,
          }}
          contentContainerStyle={[
            {
              paddingHorizontal: Platform.OS === 'android' ? cardInset : 0,
            },
          ]}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <ListItem item={item} />
            </View>
          )}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews
        />
      </View>
    </>
  );
};

export default SearchCuisine;

// const index = () => (
//   <View>
//     <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
//       <TextEle variant="body2" style={{ fontWeight: 'bold', paddingLeft: 10 }}>
//         Search by Cuisine
//       </TextEle>
//     </View>
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={{ paddingHorizontal: 20 }}>
//       {data.map(item => (
//         <View
//           key={item.id}
//           style={{
// paddingLeft: 5, marginVertical: 5, marginHorizontal: 5, alignItems:
// 'center' }}>
//           <Image
//             style={{
//               borderRadius: 10,
//               height: 200,
//               width: 300,
//             }}
//             source={item.img1}
//           />
//           <TextEle variant="title">{item.text}</TextEle>
//         </View>
//       ))}
//     </ScrollView>
//   </View>
// );

// export default index;
