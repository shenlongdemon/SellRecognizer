import React from 'react';
import { StyleSheet, View, ListView, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, Button, Text, Icon } from 'react-native-elements'

import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import StoreLocalService from "../service/StoreLocalService";
import Product from "./part/Product";
import FindDocumentButton from "./part/FindDocumentButton";
import Bluetooth from 'react-native-bluetooth-manager';
import _ from "underscore";


export default class LookAround extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            user: {},
            pageNum: 1,
            count: 1,
            loading:false
        };
    }
    componentDidMount() {
        var self = this;
        StoreLocalService.getUser().then(function (user) {
            self.setState({ user: user });
            self.scanBluetooth();
        });


    }
    componentWillMount() {
        Actions.refresh({ right: this.renderRefreshButton });
    }
    renderRefreshButton = () => {
        return (
            <TouchableOpacity onPress={() => this.refresh()} >
                <Icon name="ios-sync" type='ionicon' size={35} color='white' />
            </TouchableOpacity>
        );
    };

    refresh = () => {
        this.scanBluetooth();
    }
    loadItemsByBluetoothNames(names) {
        var self = this;
        var devices = [];

        _.each(names, function (name, index) {
            var d = { name: name, type: -1 };
            devices.push(d);
        });

        CommonService.getProductsByBluetoothCodes(names).then((res) => {
            self.setState({loading:false});
            if (res.Status == 1) {
                _.each(res.Data, function (pruduct, index) {
                    pruduct.type = 1;
                });

                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                res.Data.push(...devices);

                self.setState({ dataSource: ds.cloneWithRows(res.Data) });
                self.setState({ count: res.Data.length });
            }
            else {
                self.setState({ count: 0 });
            }
        });
    }
    scanBluetooth() {

        console.log("scanBluetooth");
        var self = this;
        self.setState({loading:true});
        var names = [];
        const discoverOptions = {
            uuids: [] // list of BLE service uuids to filter devices during scan
        };

        const onDeviceFound = device => {
            const { id, name } = device;
            console.log("BT device + " + JSON.stringify(device));
            names.push(device.name);
        };
        console.log("Bluetooth start");
        Bluetooth.startScanWithDiscovery(discoverOptions, onDeviceFound)
            .then(scan => scan.stopAfter(9000)) // automatically stop scan after 9000ms
            .then(stoppedOnTime => {
                self.loadItemsByBluetoothNames(names);
                // true if scan ran for full duration, false if stopped before
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
                    {
                        !this.state.loading ? <View/>
                        :<Row style={{
                            alignItems: 'center',
                            justifyContent: 'center', height: 70
                        }}>
                            <ActivityIndicator size="large" color="#e65e5e" />
                        </Row>
                    }
                    {


                        (this.state.count > 0 || this.state.loading) ? <View />
                            : <Row style={{
                                alignItems: 'center',
                                justifyContent: 'center', height: 70
                            }}>
                                <Text h3 style={{color:'#B1B0B0'}}>No bluetooth around.</Text>
                            </Row>
                    }


                    <Row >
                        <ListView
                            style={{ backgroundColor: "#e6e6e6" }}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            renderRow={(item) =>
                                item.type == 1 ?
                                    <Product item={item} style={{ height: 130 }}></Product>
                                    : <Grid style={{ height: 130 }}>
                                        <Row >
                                            <Col size={1}>
                                            </Col>
                                            <Col size={9} style={{ justifyContent: 'center', }}>
                                                <Text h4>{item.name}</Text>
                                            </Col>

                                        </Row>
                                    </Grid>


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