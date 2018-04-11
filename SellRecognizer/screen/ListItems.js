import React from 'react';
import { StyleSheet, Text, View, ListView,Image } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
export default class ListItems extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }
  componentDidMount() {
    this.setState({ isMounted: true })
    this.loadItems();

  }
  loadItems() {
    var self = this;
    CommonService.getItemByOwnerId("+84905690200")
      .then(function (res) {
        console.log("CommonService.getItems res " + JSON.stringify(res));

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        self.setState({ dataSource: ds.cloneWithRows(res.Data) });
        console.log("CommonService.getItems state " + JSON.stringify(this.state));
      });
  }
  render() {
    return (
      <View style={styles.container}>

        <Grid>
          <Row>
            <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={(item) =>
                <View>
                  <Text onPress={() =>
                Actions.itemdetail()
              }>{item.owner.firstName + "'s " + item.name}</Text>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: item.image.link }}
                  />
                </View>}
            />
          </Row>
          <Row style={{ height: 50 }}>
            <Text
              onPress={() =>
                Actions.searchimageitem()
              } // New Code
            >Add item</Text>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});