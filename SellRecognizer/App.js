import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import ListItems from './screen/ListItems';
import SearchImageItem from './screen/SearchImageItem';
import FillItemInfor from './screen/FillItemInfor';
import MakeOwner from './screen/MakeOwner';
import GenCode from './screen/GenCode';

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
        
          <Scene key="searchimageitem"
            component={SearchImageItem}
            title="Select one"
          />
          <Scene key="filliteminfor"
            component={FillItemInfor}
            title="Fill information"
          />
          <Scene key="makeowner"
            component={MakeOwner}
            title="Make Owner"
          />
          <Scene key="gencode"
            component={GenCode}
            title="Gen Owner"
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
