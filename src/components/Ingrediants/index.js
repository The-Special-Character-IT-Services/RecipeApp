import React, { useEffect, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import { Dimensions, FlatList, View } from 'react-native';
import Image from 'react-native-fast-image';
import TextEle from '../TextEle';

const { width: windowWidth } = Dimensions.get('window');

export const CARD_WIDTH = windowWidth * 0.9;

const cardInset = (windowWidth - CARD_WIDTH) / 1.4;

const Ingrediants = ({ ingredients }) => {
  const { colors } = useTheme();
  const flatListRef = useRef(null);
  useEffect(() => {
    flatListRef.current.scrollToOffset({
      animated: false,
      offset: -cardInset,
    });
  }, []);

  const image = [
    {
      id: 1,
      img: require('../../assets/images/EroticSandwich.png'),
    },
    {
      id: 2,
      img: require('../../assets/images/pulavspecial.png'),
    },
    {
      id: 3,
      img: require('../../assets/images/WinterSpecialVasana.png'),
    },
    {
      id: 4,
      img: require('../../assets/images/lipsmackingsoup.png'),
    },
  ];

  console.log(ingredients);

  return (
    <>
      <View
        style={{
          marginVertical: 10,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextEle variant="subTitle1" style={{ paddingHorizontal: 30, marginVertical: 10 }}>
            Ingrediants
          </TextEle>
        </View>
        <FlatList
          ref={flatListRef}
          data={ingredients}
          horizontal
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 5 }}>
              <Image
                source={{ uri: image.img }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 20,
                }}
              />
              <TextEle variant="caption" style={{ color: colors.text, marginTop: 20 }}>
                {item?.ingredient?.name}
              </TextEle>
            </View>
          )}
          removeClippedSubviews
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </>
  );
};

export default Ingrediants;
