import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import TextEle from '../TextEle';
import data from './data';
import Pie from '../../assets/images/Pie.jpg';
import BreadWiches from './BreadWiches';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const subt = `Recipes in this write-up are protected by copyright law. Reproduction and distribution
of the same without a written consent from Studio D’ Food Couture is prohibited. ©
Studio De Food Couture `;

const PriceTag = () => {
  const { colors } = useTheme();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '100%'], []);

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
        topInset={60}>
        <BottomSheetScrollView
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: colors.background,
            borderRadius: 20,
          }}>
          <TextEle style={{}} variant="title">
            Key Points:-
          </TextEle>
          <View>
            {data.map(element => (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextEle key={element.id} variant="body2" style={{ paddingVertical: 10 }}>
                    {element.Sen}
                  </TextEle>
                  <TextEle
                    variant="body2"
                    style={{ paddingVertical: 10, color: 'gray', width: 120 }}>
                    {element.Sub}
                  </TextEle>
                </View>
                <View style={{ height: 1, width: 330, backgroundColor: 'gray' }} />
              </View>
            ))}
            <TextEle variant="caption" style={{ marginVertical: 20 }}>
              {subt}
            </TextEle>
          </View>
          <TextEle>Varieties:-</TextEle>
          {BreadWiches.map(element => (
            <TextEle variant="body1" style={{ textAlign: 'justify', width: 400 }}>
              {element.Breadwiches}
            </TextEle>
          ))}
        </BottomSheetScrollView>
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
