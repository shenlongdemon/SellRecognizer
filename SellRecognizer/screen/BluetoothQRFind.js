import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import StoreLocalService from "../service/StoreLocalService";
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'


export default class BluetoothQRFind extends React.Component {
    constructor(props) {
        super(props);
        StoreLocalService.getPhone().then(function (phone) {
            console.log("BluetoothQRFind phone " + phone);
        });
    }
    scanQR() {
        console.log("click scanQR " + JSON.stringify(this.state));        
    }
    render() {
        return (
            <CommonPage>
                <Grid>
                    <Row size={1}></Row>
                    <Row size={2}>
                        <Image style={{width:'100%', height:'100%'}}
                            source={require('../assets/bluetooth_back.png')}
                            resizeMode="contain"
                         />
                    </Row>
                    <Row size={1}>
                        <Grid>
                        <Row style={{height:30}}>
                            <Text h4 style={styles.text} >Tap Bluetooth Icon</Text>
                            </Row>
                            <Row style={{height:30}}>
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
            </CommonPage>
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
    text: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    button: {
        borderColor: "transparent",
        borderRadius: 10,
        width: '100%',
        height:'90%',
        
    },
});
