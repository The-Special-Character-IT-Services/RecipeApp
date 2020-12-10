import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import React, { useMemo, useRef } from 'react';
import { View, Dimensions, Image } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import Preparation from '../../components/Preparation';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const RecipeDetail = ({ route, navigation }) => {
  const { colors } = useTheme();

  const { img } = route.params;
  const headerHeight = useHeaderHeight();
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
        source={img}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => null}
        topInset={headerHeight}>
        <BottomSheetView
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Preparation
            onWatchVideoPress={() => {
              navigation.navigate('RecipeVideo');
            }}
          />
        </BottomSheetView>
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
