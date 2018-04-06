import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import ListItems from './screen/ListItems';
import AddItem from './screen/AddItem';
import SearchImageItem from './screen/SearchImageItem';
import FillItemInfor from './screen/FillItemInfor';

export default class App extends React.Component {
  render() {
    return (
      <Router>
      <Scene key="root">
        <Scene key="listitems"
          component={ListItems}
          title="Your items"
          initial          
        />      
        <Scene key="additem"
          component={AddItem}
          title="Create new"
                    
        />   
        <Scene key="searchimageitem"
          component={SearchImageItem}
          title="Select one"                    
        />   
        <Scene key="filliteminfor"
          component={FillItemInfor}
          title="Item"                    
        />   


      </Scene>
    </Router>
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
