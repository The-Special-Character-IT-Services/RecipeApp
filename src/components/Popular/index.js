import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, ImageBackground, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import HeartIcon from '../../assets/icons/heart-icon.svg';
import TimerIcon from '../../assets/icons/Timer-icon.svg';
import StarIcon from '../../assets/icons/star-icon.svg';
import TextEle from '../TextEle';
import data from './data';

const Popular = ({ onRecipePress }) => {
  const { colors } = useTheme();
  return (
    <>
      <View>
        <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
          <TextEle variant="title1" style={{ fontSize: 20, fontWeight: 'bold' }}>
            Popular
          </TextEle>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}>
          {data.map(item => (
            <Pressable
              onPress={() => onRecipePress(item)}
              key={item.id}
              style={{ marginHorizontal: 10, width: 300 }}>
              <ImageBackground
                style={{ height: 200, width: 300 }}
                imageStyle={{ borderRadius: 20 }}
                source={item.img}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <HeartIcon height={24} width={24} fill={item.id === 1 ? 'red' : 'white'} />
                </View>
              </ImageBackground>
              <View>
                <TextEle style={{ paddingTop: 20, paddingBottom: 5 }}>{item.TextHeading}</TextEle>
                <TextEle
                  style={{ flexWrap: 'wrap', paddingBottom: 10, color: 'gray', fontSize: 12 }}
                  numberOfLines={2}>
                  {item.Description}
                </TextEle>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TimerIcon height={24} width={24} fill={colors.text} />
                  <TextEle style={{ marginLeft: 8 }}>{item.time}</TextEle>
                  <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center' }}>
                    <StarIcon height={24} width={24} fill={colors.text} />
                    <TextEle style={{ marginLeft: 8 }}>{item.rating}</TextEle>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

Popular.propTypes = {
  onRecipePress: PropTypes.func.isRequired,
};

export default Popular;
