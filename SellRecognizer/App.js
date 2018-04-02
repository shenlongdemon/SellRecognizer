import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import ListItems from './screen/ListItems';
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
