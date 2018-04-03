import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import SearchImage from '../components/SearchImage'
export default class SearchImageItem extends React.Component {
  constructor(){
    super();
    alert();
    SearchImage.getImages("rolex",function(items){
      alert(item.length);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Item</Text>
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
