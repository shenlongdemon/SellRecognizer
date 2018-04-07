import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class ListItems extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
