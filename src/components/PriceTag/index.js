import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';
import TextEle from '../TextEle';
import Pie from '../../assets/images/Pie.jpg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const PriceTag = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '100%'], []);

  const Data = [
    {
      id: 1,
      img: require('../../assets/images/FoodPic1.jpg'),
      Dips: '1. Cocktail Dip',
      salad: '1. Mexican Salad',
      Breadwiches: '1. California Veggie Sandwich',
    },
    {
      id: 2,
      img: require('../../assets/images/Pizza.jpg'),
      Dips: '2. Pesto Mayo Dip',
      salad: '2.Russian Salad',
      Breadwiches: '2. Mediterranean Grill Sandwich',
    },
    {
      id: 3,
      img: require('../../assets/images/Sandwich.jpg'),
      time: '15`',
      rating: '4.0',
      Dips: '3.Curd Cucumber Dip',
      salad: '3.Guacamole Salad',
      Breadwiches: '3. Russian Toast Club Sandwich',
    },
    {
      id: 4,
      img: require('../../assets/images/Pie.jpg'),
      Dips: '4. Honey Mustard Mayo Dip',
      salad: '4. Chop Masala Salad',
      Breadwiches: '4. Roasted Corn N Avacado Bagel',
    },
    {
      id: 5,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '5. Multigrain Caramelized Focaccia sandwich',
    },
    {
      id: 6,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '6.American Corn Bonanza Sandwich',
    },
    {
      id: 7,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '7.Chipotle Club Grill Sandwich',
    },
    {
      id: 8,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '8.Street Style Melting Cheese Sandwich',
    },
    {
      id: 9,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '9.Pickle Veg Cold Sandwich',
    },
    {
      id: 10,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '10.Junglee Paneer Sandwich',
    },
    {
      id: 11,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '11.Kutch Masala Sandwich',
    },
    {
      id: 12,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '12.Spinach Cold Sandwich',
    },
    {
      id: 13,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '13.Chinese Masala Toast Sandwich',
    },
    {
      id: 14,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '14.Cocktail Toasties',
    },
    {
      id: 15,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '15.Cheese Club Sandwich',
    },
    {
      id: 16,
      img: require('../../assets/images/Something.jpg'),
      Breadwiches: '16.Paneer Pasto Toasties',
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Image
        style={{
          height: windowHeight * 0.5,
          width: windowWidth,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        source={Pie}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={insets.top}>
        <BottomSheetView style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
          <TextEle style variant="header1">
            Varities
          </TextEle>
          <BottomSheetScrollView
            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <TextEle>Dips:-</TextEle>
            {Data.map(item => (
              <TextEle>{item.Dips}</TextEle>
            ))}
            <TextEle>Salad:-</TextEle>
            {Data.map(element => (
              <TextEle>{element.salad}</TextEle>
            ))}
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>

      <RectButton
        style={{
          marginHorizontal: 40,
          marginVertical: 50,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FD6D3B',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextEle style={{ color: 'white', paddingLeft: 10 }}>Buy for Rs.249</TextEle>
      </RectButton>
    </View>
  );
};

export default PriceTag;
