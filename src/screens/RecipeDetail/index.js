import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useMemo, useRef } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Play from '../../assets/icons/play.svg';
import Ingrediants from '../../components/Ingrediants';
import TextEle from '../../components/TextEle';
import Preparation from '../../components/Preparation';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const RecipeDetail = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { img } = route.params;
  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '100%'], []);
  const Tab = createMaterialTopTabNavigator();

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
        source={img}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={headerHeight}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.text,
            indicatorStyle: {
              width: 5,
              height: 5,
              backgroundColor: colors.primary,
              borderRadius: 2,
              marginLeft: 95,
              marginBottom: 5,
            },
            style: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: colors.background,
              borderBottomWidth: 0,
              borderTopWidth: 0,
              borderBottomColor: 'transparent',
              elevation: 0,
              shadowColor: '#5bc4ff',
              shadowOpacity: 0,
              shadowOffset: {
                height: 0,
              },
              shadowRadius: 0,
            },
          }}>
          <Tab.Screen
            name="Ingrediants"
            component={Ingrediants}
            options={{
              title: 'Ingrediants',
            }}
          />
          <Tab.Screen
            name="Preparation"
            component={Preparation}
            options={{
              title: 'Preparation',
            }}
          />
        </Tab.Navigator>
        {/* </BottomSheetScrollView> */}
      </BottomSheet>
      <RectButton
        onPress={() => navigation.navigate('RecipeVideo')}
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
  );
};

RecipeDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      img: PropTypes.number,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default RecipeDetail;
