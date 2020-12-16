import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Dimensions, Image } from 'react-native';
// import { RectButton } from 'react-native-gesture-handler';
// import Play from '../../assets/icons/play.svg';
import Ingrediants from '../../components/Ingrediants';
// import TextEle from '../../components/TextEle';
import food1 from '../../assets/image/food1.jpg';
// import Preparation from '../../components/Preparation';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const RecipeDetail = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  // const { img } = route.params;
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
        source={food1}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={insets.top}>
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
        </Tab.Navigator>
      </BottomSheet>
    </View>
  );
};

export default RecipeDetail;
