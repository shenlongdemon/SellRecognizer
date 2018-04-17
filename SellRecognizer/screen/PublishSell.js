import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage";
import CommonService from "../service/CommonService";
import DetectService from '../components/DetectService';
import StoreLocalService from '../service/StoreLocalService'
import { Col, Row, Grid } from "react-native-easy-grid";

export default class PublishSell extends React.Component {
    constructor(props) {
        super(props);
        console.log("PublishSell this.props.item" + JSON.stringify(this.props.item));
        this.state = {            
            user: {}
        };
    }
    componentDidMount() {

        var self = this;
        StoreLocalService.getUser().then((user) => {
            DetectService.getDeviceInfo().then((data) => {
                user.position = data.position;
                user.weather = data.weather;
                self.setState({ user: user });
                console.log("PublishSell componentDidMount user = " + JSON.stringify(self.state.user));
            }).catch((ex) => {
                console.log("" + ex);
            });
        }).catch((ex) => {
            console.log("" + ex);
        })

    }
    publishSell() {
        console.log("PublishSell publishSell " + JSON.stringify(this.state));

        var self = this;
        CommonService.publishSell(self.props.item.id, self.state.user).then((res) => {
            console.log("PublishSell publishSell done with res " + JSON.stringify(res));

            if (res.Data == 1) {
                this.props.item = res.Data;
            }
        });
    }
    render() {
        return (
            <CommonPage style={styles.container}>
                <Grid>
                    <Row style={{ height: 50 }}>

                    </Row>
                    <Row >
                        <Image
                            style={{ height: "100%", width: "100%" }}
                            source={{ uri: this.props.item.image.link }}
                            resizeMode="contain"
                        />
                    </Row>
                    <Row >

                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }} >
                        {
                            (this.props.item.sellCode != undefined && this.props.item.sellCode != "") ?
                                <QRCode
                                    value={this.props.item.sellCode}
                                    //size={100}
                                    bgColor='black'
                                    fgColor='white' />
                                : <View />
                        }

                    </Row>

                    <Row style={styles.container}>
                        {
                            (this.props.item.sellCode == undefined || this.props.item.sellCode == "") ?
                                <Button large buttonStyle={styles.button} title="Generate Code" onPress={this.publishSell.bind(this)} />
                                : <View />
                        }
                    </Row>

                    <Row style={{ height: 50 }}>


                    </Row>
                </Grid>
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#eda751",
        borderColor: "transparent",
        borderRadius: 10,
        width: '100%',


    },
});
