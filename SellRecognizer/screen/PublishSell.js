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
import ItemInfo from './part/ItemInfo';
export default class PublishSell extends React.Component {
    constructor(props) {
        super(props);
        console.log("PublishSell this.props.item" + JSON.stringify(this.props.item));
        this.state = {
            user: {},
            item: props.item
        };
    }
    componentDidMount() {
        var self = this;
        CommonService.getUserInfo().then((user) =>{
            self.setState({ user: user });
        });
    }
    canSell(){
        var can = true;
        if (this.state.item.sellCode.length > 0){
            can = false;
        }
        return can;
    }
    publishSell() {
        console.log("PublishSell publishSell " + JSON.stringify(this.state));

        var self = this;
        CommonService.publishSell(self.state.item.id, self.state.user).then((res) => {
            console.log("PublishSell publishSell done with res " + JSON.stringify(res));
            if (res.Status == 1) {
                Actions.gencode({code:res.Data.sellCode});
            }
        });
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
                    <Row >

                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }} >
                        {
                            (this.state.item.sellCode != undefined && this.state.item.sellCode != "") ?
                                <QRCode
                                    value={this.state.item.code}
                                    bgColor='black'
                                    fgColor='white' />
                                : <View />
                        }

                    </Row>

                    <Row style={styles.container}>
                        {
                            (this.canSell()) ?
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
