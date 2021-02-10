/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import { Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from '@components/loading';
import useCategoriesApi from '../../hooks/useCategoriesApiHook';
import TextEle from '../TextEle';

const Category = ({ onCategoryDetails }) => {
  const { colors } = useTheme();
  const { data } = useCategoriesApi();
  if (!data?.categories) {
    return <Loading />;
  }
  return (
    <View>
      <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
        <TextEle variant="body1" style={{ color: 'gray', fontWeight: 'bold', paddingLeft: 10 }}>
          Select a category
        </TextEle>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {data?.categories.map(item => (
          <View key={item.id} style={{ marginHorizontal: 5, alignItems: 'center' }}>
            <Pressable onPress={onCategoryDetails}>
              <View
                style={{
                  marginHorizontal: 5,
                  height: 50,
                  borderRadius: 12,
                  width: 50,
                  marginVertical: 10,
                  backgroundColor: item.id === 1 ? colors.primary : colors.card,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: colors.text,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8,
                }}>
                <Icon name={item.iconName} size={24} color={colors.primary} />
                {/* {item.icon(item.id === 1 ? colors.card : colors.primary)} */}
              </View>
            </Pressable>
            <View>
              <TextEle variant="caption">{item.name}</TextEle>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;
