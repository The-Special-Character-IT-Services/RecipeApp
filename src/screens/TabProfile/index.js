import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import Header from '../../components/Header';
import TextEle from '../../components/TextEle';

const { height: windowHeight } = Dimensions.get('window');

const TabProfile = () => {
  const { colors } = useTheme();

  return (
    <View style={{}}>
      <View
        style={{
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,

          height: windowHeight * 0.4,
          backgroundColor: colors.card,
          zIndex: 1,
        }}>
        <Header />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 25,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingTop: 20,
              paddingRight: 20,
              backgroundColor: colors.border,
              borderRadius: 25,
              height: 110,
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TextEle variant="header2">43</TextEle>
              <TextEle variant="body2" style={{ color: colors.text }}>
                Recipes
              </TextEle>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TextEle variant="header2">162</TextEle>
              <TextEle variant="body2" style={{ color: colors.text }}>
                Followers
              </TextEle>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TextEle variant="header2">26</TextEle>
              <TextEle variant="body2" style={{ color: colors.text }}>
                Saves
              </TextEle>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 30,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 30,
        }}>
        <Pressable onPress={() => alert('My recipes')}>
          <TextEle style={{ color: 'orange' }}>My recipes</TextEle>
        </Pressable>
        <Pressable onPress={() => alert('Followers')}>
          <TextEle>Followers</TextEle>
        </Pressable>
        <Pressable>
          <TextEle onPress={() => alert('Settings')}>Settings</TextEle>
        </Pressable>
      </View>
    </View>
  );
};

export default TabProfile;
