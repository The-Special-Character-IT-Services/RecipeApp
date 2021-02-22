/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '@components/Category';
import SearchBar from '@components/Search';
import Cuisines from '@components/Cuisines';
import HomeList from '@components/HomeList';
import { UserContext } from '@context/userContext';
import debounce from 'lodash.debounce';
import Header from '../Header';

const TabHome = ({ navigation }) => {
  const playerRef = useRef();
  const insets = useSafeAreaInsets();
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');
  const handler = useCallback(
    debounce(val => {
      setText(val);
    }, 2000),
    [],
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Header onProfilePress={() => navigation.navigate('Profile')} />
      <Pressable ref={playerRef} onPress={() => navigation.navigate('Search')}>
        <SearchBar editable={false} selectTextOnFocus={false} onchangeText={handler} value={text} />
      </Pressable>
      <Category
        onCategoryDetails={() => navigation.navigate('FilterList', { name: 'Search Category' })}
      />
      {!!user?.id && (
        <HomeList
          title="New Courses"
          userId={user.id}
          onPressViewAll={() => navigation.navigate('FilterList', { name: 'All Courses' })}
          onRecipePress={async item => {
            if (item.purchase_details && item.purchase_details.length > 0) {
              if (
                item.purchase_details.some(
                  x => x.course.id === item?.id && x.status === 'purchased',
                )
              ) {
                navigation.navigate('CourseDetailsBought', { id: item?.id, userId: user.id });
              } else {
                navigation.navigate('CourseDetails', { id: item?.id, userId: user.id });
              }
            } else {
              navigation.navigate('CourseDetails', { id: item?.id, userId: user.id });
            }
          }}
        />
      )}
      <Cuisines
        onCuisinePress={item =>
          navigation.navigate('FilterList', {
            name: 'Search Cuisine',
            where: `{cuisine:{id: ${item?.id}}}`,
            userId: user.id,
          })
        }
      />
    </ScrollView>
  );
};

TabHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabHome;
