import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage";
import CommonService from "../service/CommonService";

import { Col, Row, Grid } from "react-native-easy-grid";

export default class PublishSell extends React.Component {
    constructor(props) {
        super(props);
        console.log(JSON.stringify(this.props));
        this.state = {
            item : this.props.item
        };

    }
    componentWillMount() {
        // Actions.refresh({ title: this.props.item.name + " " + this.props.item.category.value })
    }
    publishSell() {
        var self = this;
        CommonService.publishSell().then((res) => {
            if (res.Data == 1){
                self.setState({item: res.Data});
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
                            source={{ uri: this.state.item.image.link }}
                            resizeMode="contain"
                        />
                    </Row>
                    <Row >

                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <QRCode
                            value={this.state.item.sellCode}
                            //size={100}
                            bgColor='black'
                            fgColor='white' />
                    </Row>
                    
                    <Row style={styles.container}>
                        <Button large buttonStyle={styles.button} title="Generate Code" onPress={this.publishSell(this)} />
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
