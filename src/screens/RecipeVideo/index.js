import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import { VictoryPie } from 'victory-native';

const summary = `Macronutrients: Macronutrients are required daily in large quantities. They include proteins, fats, carbohydrates, some minerals, and water.
Micronutrients: Micronutrients are required daily in small quantities—in milligrams (one thousandth of a gram) to micrograms (one millionth of a gram). They include vitamins and certain minerals that enable the body to use macronutrients. These minerals are called trace minerals because the body needs only very small amounts.
Foods consumed in the daily diet contain as many as 100,000 substances. But only 300 are classified as nutrients, and only 45 are classified as essential nutrients:

1) Vitamins
2) Minerals
3) Some amino acids (components of protein)
4) Some fatty acids (components of fats)`;
const index = () => (
  <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
    <Video
      source={{
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16),
        backgroundColor: 'black',
      }}
      controls
      resizeMode="cover"
    />
    <ScrollView style={{ margin: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nutritional Info.</Text>
      <VictoryPie
        // theme={VictoryTheme.material}
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        width={200}
        height={200}
        innerRadius={60}
        data={[{ y: 100 }, { y: 100 }, { y: 100 }, { y: 100 }, { y: 100 }]}
      />
      <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Generally, nutrients are divided into two classes:
      </Text>
      <Text style={{ fontSize: 15 }}>{summary}</Text>
    </ScrollView>
  </View>
);

export default index;
