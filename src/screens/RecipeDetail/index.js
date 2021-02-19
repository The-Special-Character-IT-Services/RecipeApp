import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useMemo, useRef } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import Image from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import Ingrediants from '@components/Ingrediants';
import TextEle from '@components/TextEle';
import Preparation from '@components/Preparation';
import { courseQuery } from '@hooks/useCoursesApiHook';
import useSWR from 'swr';
import Play from '../../assets/icons/play.svg';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const RecipeDetail = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { item } = route.params;
  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '100%'], []);

  return (
    <ScrollView>
      <View style={{}}>
        <Image
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            height: windowHeight * 0.5,
            width: windowWidth,
          }}
          source={{ uri: item?.recipeImage?.formats.medium.url }}
        />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <TextEle variant="header1" style={{ fontWeight: 'bold' }}>
            {item.name}
          </TextEle>
          {/* <Text style={{fontWeight:'bold'}}>{item.name}</Text> */}
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            backgroundColor: colors.background,
          }}>
          <Ingrediants ingredients={item.ingredients} />
          <Preparation preparation={item.steps} />
        </View>
        <RectButton
          onPress={() => navigation.navigate('RecipeVideo', { TextHeading, Description })}
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
          <Play height={24} width={24} fill="white" />
          <TextEle style={{ color: 'white', paddingLeft: 10 }}>Watch Video</TextEle>
        </RectButton>
      </View>
    </ScrollView>
  );
};

RecipeDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      img: PropTypes.number,
      TextHeading: PropTypes.string,
      Description: PropTypes.string,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default RecipeDetail;
