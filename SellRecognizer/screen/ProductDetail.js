import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Alert } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import DetectService from '../components/DetectService';
import StoreLocalService from '../service/StoreLocalService'
export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        //console.log("ProductDetail " + JSON.stringify(this.props.item));
        this.state = {
            user: null,
            canBuy: false,
            buyTittle: "BUY"
        };

    }
    componentWillReceiveProps(nextProps) {
        Actions.refresh({ title: nextProps.item.name + " " + nextProps.item.category.value })
    }
    componentWillMount() {
        var self = this;
        StoreLocalService.getUser().then((user) => {
            console.log(self.props.item.owner.id + " " + user.id);

            var buy = self.props.item.buyer == undefined ? "BUY" : (self.props.item.buyer.id == user.id ? "CONFIRM" : "BUY");
            self.setState({ user: user, canBuy: self.props.item.owner.id == user.id, buyTittle: buy });
            console.log("ProductDetail " + JSON.stringify(self.state));

        });
    }
    confirmReceiveItem() {
        var self = this;
        CommonService.confirmReceiveItem(self.props.item.id).then((res) => {
            console.log("CommonService.confirmReceiveItem " + JSON.stringify(res));
            if (res.Status == 1) {
                Actions.reset('mainboard');
            }
        });
    }
    buy() {
        var self = this;
        if (this.state.buyTittle == "CONFIRM") {
            Alert.alert(
                'Confirm',
                'You received pruduct and confirm ?',
                [
                    { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'Yes', onPress: () => self.confirmReceiveItem() },
                ],
                { cancelable: false }
            )
        }
        else {
            Actions.paymentproduct({ item: this.props.item });
        }
    }
    history() {
        Actions.history({ item: this.props.item });
    }
    render() {

        return (
            <CommonPage style={styles.container}>
                <Grid>
                    <Row style={{ height: 50 }}>

                    </Row>
                    <Row size={4}>
                        <ItemInfo item={this.props.item} />
                    </Row>

                    <Row size={2} style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <QRCode
                            value={this.props.item.sellCode}
                            bgColor='black'
                            fgColor='white' />
                    </Row>


                    <Row style={{ height: 50 }}>
                        <ImageBackground
                            resizeMode='stretch'
                            source={require("../assets/background.png")}
                            style={styles.container}
                        ><Grid style={styles.container}>
                                <Col>
                                    <Button large disabledStyle={{ backgroundColor: 'transparent', opacity: 0.3 }} disabled={this.state.canBuy} buttonStyle={styles.button} title={this.state.buyTittle} onPress={this.buy.bind(this)} />
                                </Col>
                                <Col style={{ width: 1, height: 40, borderWidth: 0.5, borderColor: '#FAFAFA' }} ></Col>
                                <Col>
                                    <Button large rightIcon={{ name: 'angle-right', type: 'font-awesome', size: 20 }} buttonStyle={styles.button} title="HISTORY" onPress={this.history.bind(this)} />
                                </Col>
                            </Grid>
                        </ImageBackground>

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
        backgroundColor: "transparent"
    },
});
