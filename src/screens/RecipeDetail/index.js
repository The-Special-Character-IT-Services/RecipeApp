import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import Image from 'react-native-fast-image';
import Ingrediants from '@components/Ingrediants';
import TextEle from '@components/TextEle';
import Preparation from '@components/Preparation';
import RAButton1 from '@components/RAButton1';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const RecipeDetail = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { item } = route.params;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View>
          <Image
            style={{
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              height: windowHeight * 0.5,
              width: windowWidth,
            }}
            source={
              item?.recipeImage?.formats?.medium?.url
                ? { uri: item?.recipeImage?.formats?.medium?.url }
                : require('../../assets/images/noImage2.png')
            }
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <TextEle variant="title1" style={{ marginBottom: 10 }}>
              {item?.name}
            </TextEle>
            <View style={{ height: 2, width: 150, backgroundColor: colors.text }} />
            {/* <Text style={{fontWeight:'bold'}}>{item.name}</Text> */}
          </View>
          <View
            style={{
              borderRadius: 16,
              marginBottom: 100,
              backgroundColor: colors.background,
            }}>
            <Ingrediants ingredients={item?.ingredients} />
            <Preparation preparation={item?.steps} />
          </View>
        </View>
      </ScrollView>
      <View>
        <RAButton1
          style={{
            position: 'absolute',
            bottom: 10,
            justifyContent: 'center',
            marginVertical: 20,
            height: 55,
            width: '100%',
          }}
          variant="fill"
          text="Watch Video"
          icon="play"
          onPress={() => navigation.navigate('RecipeVideo')}
        />
      </View>
      {/* <RectButton
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
          }}> */
      /* <Play height={24} width={24} fill="white" />
          <TextEle style={{ color: 'white', paddingLeft: 10 }}>Watch Video</TextEle>
        </RectButton> */}
    </>
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
