import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from '../service/CommonService';


export default class PaymentProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoad: false
        };
    }
    componentDidMount() {

        var self = this;

        CommonService.getUserInfo().then((user) => {
            self.setState({ user: user })
            console.log("PaymentProduct userInfo " + JSON.stringify(self.state.user));
        });
    }

    payment() {
        var user = this.state.user;

        console.log("BuyItem payment" + JSON.stringify(this.state));
        if (this.state.user) {
            CommonService.payment(this.props.item.id, this.state.user).then(function (res) {
                Actions.gencode({code:res.Data.buyerCode});
            });
        }
        else {
            alert("please wait");
        }
    }
    render() {
        return (
            <CommonPage>
                <Grid>
                    <Row>

                    </Row>
                    <Row style={{ height: 50 }}>
                        <Col size={1}></Col>
                        <Col size={7}  >
                            <Button fontSize={20} buttonStyle={styles.button} title="PAYMENT" onPress={this.payment.bind(this)} backgroundColor="#eda751" />
                        </Col>
                        <Col size={1}></Col>
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
        borderColor: "transparent",
        borderRadius: 10,
        width: '100%',
        height: '90%',

    },
});
