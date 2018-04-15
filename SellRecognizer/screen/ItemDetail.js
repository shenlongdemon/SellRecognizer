import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(JSON.stringify(this.props));
    }
    render() {
        return (
            <CommonPage style={styles.container}>
                <Grid>
                    <Row>
                        <Grid>
                            <Row>
                                <Image
                                    style={{ height: "100%", width: "100%" }}
                                    source={{ uri: this.props.item.image.link }}
                                />
                            </Row>
                            <Row>

                            </Row>
                            <Row>
                                <Col>
                                    <QRCode
                                        value={this.props.item.name}
                                        size={100}
                                        bgColor='black'
                                        fgColor='white' /></Col>
                                <Col>
                                    <OMCode
                                        style={{ width: 100, height: 100 }}
                                        text={this.props.item.name}
                                    /></Col>

                            </Row>

                        </Grid>
                    </Row>
                    <Row style={{ height: 50 }}>
                        <Col>
                            <Text onPress={() =>
                                Actions.buyitem({item:this.props.item})
                            }
                            >Buy</Text>
                        </Col>
                        <Col>
                            <Text>History</Text>
                        </Col>
                    </Row>
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
});
