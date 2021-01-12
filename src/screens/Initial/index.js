import React from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { ImageBackground, KeyboardAvoidingView, View, Image } from 'react-native';
import LoginImage from '@assets/images/LoginImage.png';
import RAText from '@components/RAText';
import RAButton1 from '@components/RAButton1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Initial = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={LoginImage} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
        }}>
        <View style={{ alignItems: 'center', marginBottom: 72 }}>
          <RAText
            variant="h1"
            style={{
              marginBottom: 16,
              color: colors.white,
            }}>
            Start Cooking
          </RAText>
          <RAText
            variant="p1"
            style={{
              width: 210,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
            }}>
            Let’s join our community to cook better food!
          </RAText>
        </View>

        <RAButton1 onPress={() => navigation.navigate('Login')} variant="fill" text="Get Started" />
      </View>
    </ImageBackground>
  );
};

Initial.propTypes = {
  route: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default Initial;
