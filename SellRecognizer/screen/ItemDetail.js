import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log("ItemDetail " + JSON.stringify(this.props.item));
        this.state = {
            carSell : this.props.item.sellCode == "" 
        };

    }
    componentWillReceiveProps(nextProps) {
        Actions.refresh({ title: nextProps.item.name + " " + nextProps.item.category.value })
    }
    componentWillMount() {
        Actions.refresh({ title: this.props.item.name + " " + this.props.item.category.value })
    }
    sell() {
        Actions.publishsell({ item: this.props.item });
    }
    history(){
        Actions.history({ item: this.props.item });
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
                        <QRCode
                            value={this.props.item.code}
                            //size={100}
                            bgColor='black'
                            fgColor='white' />
                    </Row>
                    <Row >

                    </Row>

                    <Row style={{ height: 50 }}>
                        <ImageBackground
                            resizeMode='stretch'
                            source={require("../assets/background.png")}
                            style={styles.container}
                        ><Grid style={styles.container}>
                                <Col>
                                    <Button disabledStyle={{backgroundColor:'transparent', opacity:0.3}} disabled={ this.props.item.sellCode != "" } large buttonStyle={styles.button}  title="SELL" onPress={this.sell.bind(this)} />
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
