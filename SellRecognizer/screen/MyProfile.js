import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import StoreLocalService from "../service/StoreLocalService";

export default class MyProfile extends React.Component {
    getImage() {
        StoreLocalService.clearAll();
    }
    render() {
        return (
            <CommonPage styles={styles.container}>
                <Grid>
                    <Row>
                        <Text onPress={() => this.getImage()}>
                            Myprofile
                        </Text>
                    </Row>
                    <Row>

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
});


