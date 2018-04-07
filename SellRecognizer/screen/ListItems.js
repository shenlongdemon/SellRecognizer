import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import OMCode from '../components/OMCode';
export default class ListItems extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <OMCode
          style={{ height: 100, width: 100 }}
          text="c1dee530-553f-4ad2-a5b1-50d6b683d3e3"
        />

        <Text
          onPress={() => Actions.searchimageitem()} // New Code
        >Add new item</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
