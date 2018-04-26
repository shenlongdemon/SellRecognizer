import React from 'react';

import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import { StyleSheet, View, Image, Geolocation, TouchableOpacity } from 'react-native';
import { FormLabel, FormValidationMessage, FormInput, Button, Text } from 'react-native-elements'

import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from 'react-native-material-dropdown';
import CommonService from '../service/CommonService'
import CommonPage from "./CommonPage"
import { ImagePicker } from 'expo';
import DetectService from '../components/DetectService'
import StoreLocalService from "../service/StoreLocalService";
export default class GenCode extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <CommonPage>
                <Grid>
                    <Row style={{ height: 30 }}></Row>
                    <Row style={styles.container}>
                        <QRCode
                            value={CommonService.compress(this.props.code)}
                            size={300}
                            bgColor='black'
                            fgColor='white' />
                    </Row>
                    {/* <Row style={styles.container}>
                        <OMCode
                            style={{ width: 200, height: 200 }}
                            text={this.props.code}
                        />
                    </Row> */}
                    <Row style={{
                        height: 70, alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <Col sixe={2}></Col>
                        <Col>
                        <Button buttonStyle={styles.buttonLogin} title="Done" onPress={() => Actions.reset('mainboard')} backgroundColor="#eda751" />

                        </Col>
                        <Col sixe={2}></Col>

                    </Row>
                </Grid>


            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {       
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLogin: {
        borderColor: "transparent",
        borderRadius: 10,
        

    },
});
