import React from 'react';
import { View, Dimensions, Image } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import Preparation from '../../components/Preparation';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const index = ({ route, navigation }) => {
  const { img } = route.params;
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
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,

          height: windowHeight * 0.65,
          backgroundColor: '#FFF',
          zIndex: 1,
        }}>
        <Preparation
          onWatchVideoPress={() => {
            navigation.navigate('RecipeVideo');
          }}
        />
      </View>
    </View>
  );
};

export default index;
