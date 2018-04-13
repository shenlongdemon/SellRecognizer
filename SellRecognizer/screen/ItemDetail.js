import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

                    </Row>
                    <Row style={{ height: 50 }}>
                        <Col>
                            <Text>Sell</Text>
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
