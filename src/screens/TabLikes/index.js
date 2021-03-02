import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '@context/userContext';
import { View } from 'react-native';
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
          item.purchase_details.some(x => x.course.id === item?.id && x.status === 'purchased')
            ? navigation.navigate('CourseDetailsBought', { id: item?.id, userId: user?.id })
            : navigation.navigate('CourseDetails', { id: item?.id, userId: user?.id })
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
