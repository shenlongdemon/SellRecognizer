import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from '../service/CommonService';
import DetectService from '../components/DetectService';
import StoreLocalService from '../service/StoreLocalService'
export default class BuyItem extends CommonPage {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoad: false
        };
    }
    componentDidMount() {
        
       var self = this;
        StoreLocalService.getUser().then((user) => {
            DetectService.getDeviceInfo().then((data) => {
                user.position = data.position;
                user.weather = data.weather;
                self.setState({ user: user})
            }).catch((e) => {
                
            });
            
        });        
    }

    payment() {
        var user = this.state.user;
       
        console.log("BuyItem payment" + JSON.stringify(this.state) );
        if (this.state.user) {
            CommonService.payment(this.props.item.id, this.state.user).then(function (res) {

            });
        }
        else {
            alert("please wait");
        }
    }
    render() {
        return (

            <Grid>
                <Row>

                </Row>
                <Row style={{ height: 50 }}>
                    <Text
                        onPress={() => this.payment()}>
                        Payment
                    </Text>
                </Row>
            </Grid>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
