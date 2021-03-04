import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '@context/userContext';
import { View } from 'react-native';
import TextEle from '@components/TextEle';
import LottieView from 'lottie-react-native';
import SearchBar from '../../components/Search';
import LikedRecipe from '../../components/LikedRecipe';

const TabLikes = ({ navigation }) => {
  const [text, setText] = useState('');
  const { user } = useContext(UserContext);

  const onChangeText = val => {
    setText(val);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onChangeText={onChangeText} value={text} clearText={() => setText('')} />
      <LikedRecipe
        onRecipeDetail={item =>
          navigation.navigate('CourseDetails', { id: item?.id, userId: user?.id })
        }
      />
    </View>
  );
};

TabLikes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default TabLikes;
