import React from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import StoreLocalService from "../service/StoreLocalService";
import CommonService from "../service/CommonService";

import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'

import FindDocumentButton from "./part/FindDocumentButton";
import { BarCodeScanner, Permissions } from 'expo';
import Bluetooth from 'react-native-bluetooth-manager';

export default class BluetoothQRFind extends React.Component {


    constructor(props) {
        super(props);
        StoreLocalService.getPhone().then(function (phone) {
            console.log("BluetoothQRFind phone " + phone);
        });
        this.state = {
            hasCameraPermission: null,
            turnQRCodeScanner: false,
            isProcessQRCode: false
        }
    }
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        const discoverOptions = {
            uuids: [] // list of BLE service uuids to filter devices during scan
          };
          
          const onDeviceFound = device => {
            const {id, name} = device;
            console.log("BT device + " + JSON.stringify(device));
          };
          console.log("Bluetooth start");
          Bluetooth.startScanWithDiscovery(discoverOptions, onDeviceFound)
            .then(scan => scan.stopAfter(9000)) // automatically stop scan after 9000ms
            .then(stoppedOnTime => {
              // true if scan ran for full duration, false if stopped before
            });
    }
    scanQR() {
        this.setState({ turnQRCodeScanner: !this.state.turnQRCodeScanner });
        console.log(this.state.turnQRCodeScanner);
    }
    lookAround() {
        Actions.lookaround();
    }
    handleBarCodeRead = qrData => {
        var self = this;
        setTimeout(() => {
            if (self.state.isProcessQRCode == false && self.state.turnQRCodeScanner == true) {
                self.setState({ isProcessQRCode: true });
                
                console.log("QRCode data " + JSON.stringify(qrData));
                CommonService.getItemByQRCode(qrData.data).then((res) => {
                    console.log("BluetoothQRFind getItemByQRCode res " + JSON.stringify(res));
                    if (res.Status == 1) {
                        if (res.Data) {
                            Actions.productdetail({ item: res.Data })
                        }
                    }
                    else {
    
                    }
                    self.setState({ isProcessQRCode: false });
                    self.setState({ turnQRCodeScanner: false });
                }).catch((e) => {
    
                });
            }
        },
            1000
        )


        


    };
    render() {
        return (
            <CommonPage>
                <ImageBackground
                    resizeMode='stretch'
                    source={require("../assets/background.png")}
                    style={styles.container}
                >
                    <Grid style={styles.container}>
                        <Row size={this.state.turnQRCodeScanner == false ? 1000 : 1} >
                            <Grid>
                                <Row size={1}></Row>
                                <Row size={2}>
                                    <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.lookAround()}>
                                        <Image style={{ width: '100%', height: '100%' }}
                                            source={require('../assets/bluetooth_back.png')}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </Row>
                                <Row size={1}>
                                    <Grid>
                                        <Row style={{ height: 30 }}>
                                            <Text h4 style={styles.text} >Tap Bluetooth Icon</Text>
                                        </Row>
                                        <Row style={{ height: 30 }}>
                                            <Text h4 style={styles.text} >to Search Around</Text>
                                        </Row>
                                    </Grid>
                                </Row>
                                <Row size={1}>
                                    <Text h4 style={styles.text} >or</Text>
                                </Row>
                                <Row size={1}>
                                    <Col size={1}></Col>
                                    <Col size={7}  >
                                        <Button fontSize={20} buttonStyle={styles.button} title="Scan QR Code" onPress={this.scanQR.bind(this)} backgroundColor="#eda751" />
                                    </Col>
                                    <Col size={1}></Col>
                                </Row>
                                <Row size={1}></Row>
                            </Grid>
                        </Row>

                        <Row size={this.state.turnQRCodeScanner == false ? 1 : 1000} >
                            <Grid style={{ backgroundColor: 'black', opacity: this.state.turnQRCodeScanner == false ? 0 : 1 }}>
                                <Row>
                                    <BarCodeScanner
                                        style={{ width: "100%", height: "100%" }}
                                        onBarCodeRead={this.handleBarCodeRead}
                                    />
                                </Row>
                                <Row style={{ height: 50 }} >
                                    <Col size={1}></Col>
                                    <Col size={1} style={styles.center} >
                                        <Button fontSize={20} buttonStyle={styles.button} title="Close" onPress={this.scanQR.bind(this)} backgroundColor="#eda751" />
                                    </Col>
                                    <Col size={1}></Col>
                                </Row>
                                <Row style={{ height: 10 }} >

                                </Row>
                            </Grid>
                        </Row>
                    </Grid>




                </ImageBackground>
                {/* <FindDocumentButton style={styles.findbutton} /> */}
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({

    showQRCode: {
        height: "100%",
    },
    hideQRCode: {
        height: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    button: {
        borderColor: "transparent",
        borderRadius: 10,
        width: '100%',
        height: '90%',

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
