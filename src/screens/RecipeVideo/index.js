import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import { Svg } from 'react-native-svg';
import PropTypes from 'prop-types';
import { VictoryLabel, VictoryPie } from 'victory-native';

const summary = `Macronutrients: Macronutrients are required daily in large quantities. They include proteins, fats, carbohydrates, some minerals, and water.

Micronutrients: Micronutrients are required daily in small quantities—in milligrams (one thousandth of a gram) to micrograms (one millionth of a gram). They include vitamins and certain minerals that enable the body to use macronutrients. These minerals are called trace minerals because the body needs only very small amounts.

Foods consumed in the daily diet contain as many as 100,000 substances. But only 300 are classified as nutrients, and only 45 are classified as essential nutrients:

1) Vitamins
2) Minerals
3) Some amino acids (components of protein)
4) Some fatty acids (components of fats)`;

const chartData = [
  { nutriText: 'Protein', color: 'tomato', weight: 20, unit: 'g', id: 1 },
  { nutriText: 'Fat', color: 'orange', weight: 20, unit: 'g', id: 2 },
  { nutriText: 'Carbs', color: 'gold', weight: 20, unit: 'g', id: 3 },
  { nutriText: 'Vitamins', color: 'cyan', weight: 20, unit: 'g', id: 4 },
  { nutriText: 'Fibers', color: 'navy', weight: 20, unit: 'g', id: 5 },
];
const RecipeVideo = ({ route }) => {
  const { TextHeading, Description } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
      <Video
        paused
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
      <ScrollView style={{ flex: 1, margin: 15 }}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{TextHeading}</Text>
          <Text style={{ fontSize: 20 }}>{Description}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nutritional Info.</Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Svg viewBox="0 0 200 200" height={200} width={200}>
            <VictoryPie
              labels={() => null}
              colorScale={chartData.map(x => x.color)}
              width={200}
              height={200}
              innerRadius={60}
              data={chartData.map(x => ({ x: x.nutriText, y: x.weight }))}
            />
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={100}
              y={100}
              style={{ fontSize: 14 }}
              text="71 Cal"
            />
          </Svg>
          <View>
            {chartData.map(item => (
              <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                <View
                  style={{
                    height: 10,
                    width: 30,
                    backgroundColor: item.color,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />
                <Text>{`${item.weight}${item.unit}`}</Text>
                <Text style={{ color: 'gray', marginLeft: 10 }}>{item.nutriText}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ height: 1, width: 370, backgroundColor: 'gray' }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
          Generally, nutrients are divided into two classes:
        </Text>
        <Text style={{ fontSize: 15, textAlign: 'justify' }}>{summary}</Text>
      </ScrollView>
    </View>
  );
};

RecipeVideo.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      TextHeading: PropTypes.string,
      Description: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeVideo;
