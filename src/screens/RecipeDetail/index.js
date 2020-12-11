import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useMemo, useRef } from 'react';
import { View, Dimensions, Image } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import Preparation from './pages/preparation';
import Ingrediants from '../../components/Ingrediants';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const RecipeDetail = ({ route }) => {
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
        <BottomSheetScrollView
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
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
              tabStyle: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
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
        </BottomSheetScrollView>
      </BottomSheet>
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
