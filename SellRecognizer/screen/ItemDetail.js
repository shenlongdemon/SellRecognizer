import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import ItemInfo from "./part/ItemInfo";
import CommonService from '../service/CommonService'
export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log("ItemDetail " + JSON.stringify(this.props.item));
        this.state = {
            carSell: this.canSell(),
            sellTitle: this.canSell() ? "SELL" : "CANCEL"
        };

    }
    canSell() {
        return this.props.item.sellCode.length == 0;
    }
    componentWillReceiveProps(nextProps) {
        Actions.refresh({ title: nextProps.item.name + " " + nextProps.item.category.value })
    }
    componentWillMount() {
        Actions.refresh({ title: this.props.item.name + " " + this.props.item.category.value })
    }
    sell() {
        if (this.canSell()) {
            Actions.publishsell({ item: this.props.item });
        }
        else {
            CommonService.cancelSell(this.props.item.id).then((res) => {
                if (res.Status == 1) {
                    Actions.reset("mainboard");
                }
                else {
                    alert(res.Data);
                }
            });
        }
    }
    history() {
        Actions.history({ item: this.props.item });
    }
    render() {
        return (
            <CommonPage style={styles.container}>
                <Grid>
                    <Row style={{ height: 5 }}>

                    </Row>
                    <Row size={3}>
                        <ItemInfo item={this.props.item} />
                    </Row>

                    <Row size={3} style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <QRCode
                            size={240}
                            value={CommonService.compress(this.props.item.sellCode.length == 0 ? this.props.item.code : this.props.item.sellCode)}
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
                                    <Button
                                        buttonStyle={styles.button}
                                        title={this.state.sellTitle}
                                        onPress={this.sell.bind(this)} />
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
