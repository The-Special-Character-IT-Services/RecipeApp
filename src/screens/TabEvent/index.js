import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Dimensions, Image } from 'react-native';
// import Ingrediants from '../../components/Ingrediants';
// import TextEle from '../../components/TextEle';
import food1 from '../../assets/image/food1.jpg';
import EventRecipe from '../../components/EventRecipe';
// import Preparation from '../../components/Preparation';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const TabEvent = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  // const { img } = route.params;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [windowHeight * 0.6, '80%'], []);

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
        <BottomSheetView style={{ backgroundColor: colors.background, borderRadius: 25 }}>
          <EventRecipe onEventPress={() => navigation.navigate('PriceTag')} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

TabEvent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabEvent;
