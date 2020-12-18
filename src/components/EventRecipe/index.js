import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';
import { View, Image } from 'react-native';
import TextEle from '../TextEle';

const EventRecipe = ({ onEventPress }) => {
  const photos = [
    {
      id: 1,
      img: require('../../assets/images/breadwiches1.png'),
      text: 'Breadwiches',
      amount: 'SAT,DEC 19,11:00 AM GMT +5:30',
      desc: 'December 2020 Online Class',
    },
    {
      id: 2,
      img: require('../../assets/images/Belgium.png'),
      text: 'Belgium Waffles',
      amount: 'SAT,DEC 20,4:00 AM GMT +5:30',
      desc: 'December 2020 Online Class',
    },
    // {
    //   id: 3,
    //   img: require('../../assets/images/Main-Rectangle-1.jpg'),
    //   text: 'Mango puree',
    //   amount: 'SUN,DEC 21,11:00 AM GMT +5:30',
    // },
    // {
    //   id: 4,
    //   img: require('../../assets/images/Lemon.jpg'),
    //   text: 'Lemon Juice',
    //   amount: 'MON,DEC 22,11:00 AM GMT +5:30',
    // },
    // {
    //   id: 5,
    //   img: require('../../assets/images/Orange.jpg'),
    //   text: 'Orange Pulp',
    //   amount: 'TUE,DEC 23,11:00 AM GMT +5:30',
    // },
    // {
    //   id: 6,
    //   img: require('../../assets/images/Dragon.jpg'),
    //   text: 'Dragon',
    //   amount: 'WED,DEC 24,11:00 AM GMT +5:30',
    // },
  ];
  return (
    <BottomSheetView style={{ flex: 1 }}>
      {/* <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <TextEle style={{ fontSize: 23, fontWeight: 'bold' }}>Mango Mule</TextEle>
        <TextEle numberOfLines={2} style={{ color: 'gray' }}>
          Amazing combo of sweet and sour taste!Super easy to prepare.Enjoy!
        </TextEle>
      </View> */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <TextEle
          style={{
            fontSize: 27,
            fontWeight: 'bold',
            flex: 1,
            marginVertical: 5,
          }}>
          Buy Online Classes
        </TextEle>
      </View>
      <BottomSheetScrollView>
        {photos.map(item => (
          <RectButton
            rippleColor="#D3D3D3"
            onPress={onEventPress}
            key={item.id}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={item.img} />
            <View
              style={{
                flex: 1,
                paddingLeft: 15,
                justifyContent: 'center',
              }}>
              <TextEle style={{ fontWeight: 'bold', fontSize: 20 }}>{item.text}</TextEle>
              <TextEle style={{ color: 'gray', fontSize: 17 }}>{item.desc}</TextEle>
              <TextEle style={{ color: 'gray', fontSize: 15 }}>{item.amount}</TextEle>
            </View>
          </RectButton>
        ))}
      </BottomSheetScrollView>
    </BottomSheetView>
  );
};
EventRecipe.propTypes = {
  onEventPress: PropTypes.func.isRequired,
};

export default EventRecipe;
