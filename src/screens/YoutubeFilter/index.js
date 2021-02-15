import React, { useState } from 'react';
import { View } from 'react-native';
import ListButton from './ListButton';

const YoutubeFilter = () => {
  const [currentFilter, setCurrentFilter] = useState('Publish Date');
  return (
    <View style={{ flex: 1, marginLeft: 20 }}>
      <ListButton
        label="Publish Date"
        isVisibleIcon={currentFilter === 'Publish Date'}
        onPress={() => setCurrentFilter('Publish Date')}
      />
      <View style={{ height: 1, backgroundColor: 'gray' }} />
      <ListButton
        label="Likes"
        isVisibleIcon={currentFilter === 'Likes'}
        onPress={() => setCurrentFilter('Likes')}
      />
      <View style={{ height: 1, backgroundColor: 'gray' }} />
      <ListButton
        label="Views"
        isVisibleIcon={currentFilter === 'Views'}
        onPress={() => setCurrentFilter('Views')}
      />
    </View>
  );
};
export default YoutubeFilter;
