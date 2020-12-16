import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import data from './data';
import TextEle from '../../../../components/TextEle';
import StarIcon from '../../../../assets/icons/star-icon.svg';

const MyRecipes = () => {
  const { colors } = useTheme();

  const [recipes, setRecipes] = useState(data);

  useEffect(() => {
    setRecipes([...recipes, { isEmpty: true }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      data={recipes}
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={{ marginHorizontal: 20 }}
      renderItem={({ item, index }) => (
        <View
          key={item.id}
          style={{
            flex: 1,
            flexDirection: 'column',
            marginRight: index % 2 === 0 ? 10 : 0,
          }}>
          {!item.isEmpty && (
            <Image
              source={item.img}
              resizeMode="cover"
              style={{
                flex: 1,
                height: 230,
                width: undefined,
                borderRadius: 10,
              }}
            />
          )}
          {!item.isEmpty && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 15,
              }}>
              <TextEle variant="body2" style={{ color: colors.text, paddingLeft: 10 }}>
                {item.text}
              </TextEle>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 20,
                  paddingLeft: 10,
                }}>
                <StarIcon fill={colors.text} />
                <TextEle variant="body2" style={{ color: colors.text }}>
                  {item.rating}
                </TextEle>
              </View>
            </View>
          )}
        </View>
      )}
      numColumns={2}
    />
  );
};

export default MyRecipes;
