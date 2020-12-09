/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unused-state */
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput, View, ScrollView } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import TextEle from '../TextEle';

const Search = () => {
  const [text, setText] = useState('');
  const { colors } = useTheme();
  const onchangeText = val => {
    setText(val);
  };

  return (
    <ScrollView>
      <TextInput
        placeholder="Search here"
        style={{
          color: colors.text,
          borderColor: colors.border,
          borderWidth: 3,
          borderRadius: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          margin: 10,
        }}
        value={text}
        onChangeText={onchangeText}
      />
      <View style={{ flexDirection: 'row' }}>
        <TextEle
          style={{
            paddingTop: 5,
            paddingStart: 10,
            marginLeft: 24,
            borderRadius: 8,
            borderWidth: 2,
            width: 80,
            height: 30,
            alignItems: 'center',
            borderColor: colors.borderColor,
          }}>
          Trending
        </TextEle>
        <TextEle
          style={{
            paddingTop: 5,
            paddingStart: 10,
            marginLeft: 10,
            flexDirection: 'row',
            borderRadius: 8,
            borderWidth: 2,
            width: 80,
            height: 30,
            alignItems: 'center',
            borderColor: 'black',
          }}>
          Rice Items
        </TextEle>
        <TextEle
          style={{
            paddingTop: 5,
            paddingStart: 10,
            marginLeft: 10,
            flexDirection: 'row',
            borderRadius: 8,
            borderWidth: 2,
            width: 80,
            height: 30,
            alignItems: 'center',
            borderColor: 'black',
          }}>
          Sweets
        </TextEle>
      </View>
    </ScrollView>
  );
};
export default Search;

// export default class Search extends PureComponent {
//   state = {
//     valueText: '',
//   };

//   onchangeText = text => {
//     this.setState({
//       valueText: text,
//     });
//   };

//   render() {
//     return (
//       <View>
//         <TextInput
//           placeholder="Search here"
//           style={{
//             borderColor: Colors.text,
//             borderWidth: 1,
//             borderRadius: 20,
//             margin: 20,
//           }}
//           onchangeText={this.onchangeText}
//         />
//         <View style={{ flexDirection: 'row' }}>
//           <TextEle
//             style={{
//               paddingTop: 5,
//               paddingStart: 10,
//               marginLeft: 24,
//               borderRadius: 8,
//               borderWidth: 2,
//               width: 80,
//               height: 30,
//               alignItems: 'center',
//               borderColor: 'black',
//             }}>
//             Trending
//           </TextEle>
//           <TextEle
//             style={{
//               paddingTop: 5,
//               paddingStart: 10,
//               marginLeft: 10,
//               flexDirection: 'row',
//               borderRadius: 8,
//               borderWidth: 2,
//               width: 80,
//               height: 30,
//               alignItems: 'center',
//               borderColor: 'black',
//             }}>
//             Rice Items
//           </TextEle>
//           <TextEle
//             style={{
//               paddingTop: 5,
//               paddingStart: 10,
//               marginLeft: 10,
//               flexDirection: 'row',
//               borderRadius: 8,
//               borderWidth: 2,
//               width: 80,
//               height: 30,
//               alignItems: 'center',
//               borderColor: 'black',
//             }}>
//             Sweets
//           </TextEle>
//         </View>
//       </View>
//     );
//   }
// }
