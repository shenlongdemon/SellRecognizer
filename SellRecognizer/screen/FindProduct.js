import React from 'react';
import { StyleSheet, View, ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import Item from "./part/Item";
import { FormLabel, FormValidationMessage, FormInput, Button, Text } from 'react-native-elements'

export default class FindProduct extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <CommonPage style={styles.container}>
                <Grid>
                    <Row style={{ height: 70 }}>
                        <Text h4 style={{ flex: 1 }}>Find by Category</Text>
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
        flex: 1
    },
});