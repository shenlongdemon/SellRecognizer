import React from 'react';
import { StyleSheet,  View, ListView, Image,TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button, Text, Icon } from 'react-native-elements'

import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import StoreLocalService from "../service/StoreLocalService";
import Product from "./part/Product";
import FindDocumentButton from "./part/FindDocumentButton";
import Bluetooth from 'react-native-bluetooth-manager';


export default class LookAround extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            user: {},
            pageNum: 1,
            count: 1
        };
    }
    componentDidMount() {
        var self = this;
        StoreLocalService.getUser().then(function (user) {
            self.setState({ user: user });
            self.scanBluetooth();
        });


    }
    componentWillMount(){
        Actions.refresh({ right: this.renderRefreshButton });
    }
    renderRefreshButton = () => {
        return(
            <TouchableOpacity onPress={() => this.refresh() } >
                <Icon name="sync" size={25} color='white' />
            </TouchableOpacity>
        );
    };

    refresh = () => {
        this.scanBluetooth();
    }
    loadItemsByBluetoothNames(names) {
        var self = this;

        names.push('52141318121823147242102312142772');
        CommonService.getProductsByCodes(names).then((res) => {
            if (res.Status == 1) {
                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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