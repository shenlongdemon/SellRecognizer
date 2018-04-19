import React from 'react';
import { StyleSheet, Text, View, ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import StoreLocalService from "../service/StoreLocalService";
import Product from "./part/Product";
import FindDocumentButton from "./part/FindDocumentButton";


export default class LookAround extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            user: {},
            pageNum: 1
        };
    }
    componentDidMount() {
        var self = this;
        StoreLocalService.getUser().then(function (user) {
            self.setState({ user: user });
            self.loadItems();
        });


    }
    loadItems() {
        var self = this;
        CommonService.getSelledItems(self.state.pageNum)
            .then(function (res) {
                if (res.Status == 1) {
                    console.log("CommonService.getItems res " + JSON.stringify(res));
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    self.setState({ dataSource: ds.cloneWithRows(res.Data) });
                    console.log("CommonService.getItems state " + JSON.stringify(this.state));
                    self.setState({ pageNum: self.state.pageNum + 1 });
                }
            });
    }

    render() {
        return (
            <CommonPage style={styles.container}>
                <Grid >
                    <Row >
                        <ListView
                            style={{ backgroundColor: "#e6e6e6" }}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            renderRow={(item) =>
                                <Product item={item} style={{ height: 130 }}></Product>
                            }
                        />
                    </Row>

                </Grid>
                <FindDocumentButton style={styles.findbutton} />
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    findbutton: {
        position: 'absolute',
        width: "100%",
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
    }
});