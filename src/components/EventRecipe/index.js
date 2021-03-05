import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@react-navigation/native';
import data from './data';

const EventRecipe = () => (
  <BottomSheetFlatList
    data={data}
    keyExtractor={i => i}
    renderItem={renderItem}
    contentContainerStyle={styles.contentContainer}
  />
  // <BottomSheetView style={{ flex: 1, backgroundColor: colors.background, borderRadius: 25 }}>
  //   <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
  //     <TextEle
  //       style={{
  //         fontSize: 27,
  //         fontWeight: 'bold',
  //         flex: 1,
  //         marginVertical: 20,
  //       }}>
  //       Buy Online Classes
  //     </TextEle>
  //   </View>
  //   <BottomSheetScrollView>
  //     {data.map(item => (
  //       <RectButton
  //         rippleColor="#D3D3D3"
  //         onPress={onEventPress}
  //         key={item.id}
  //         style={{
  //           flexDirection: 'row',
  //           paddingHorizontal: 10,
  //           paddingVertical: 5,
  //         }}>
  //         <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={item.img} />
  //         <View
  //           style={{
  //             flex: 1,
  //             paddingLeft: 15,
  //             justifyContent: 'center',
  //           }}>
  //           <TextEle style={{ fontWeight: 'bold', fontSize: 20 }}>{item.text}</TextEle>
  //           <TextEle style={{ color: 'gray', fontSize: 17 }}>{item.desc}</TextEle>
  //           <TextEle style={{ color: 'gray', fontSize: 15 }}>{item.amount}</TextEle>
  //         </View>
  //       </RectButton>
  //     ))}
  //   </BottomSheetScrollView>
  // </BottomSheetView>
);
// EventRecipe.propTypes = {
//   onEventPress: PropTypes.func.isRequired,
// };

export default EventRecipe;
