import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Text, Button, Icon } from 'react-native-elements'

export default class FindDocumentButton extends React.Component {
    constructor(props) {
        super(props);
        console.log("FindDocumentButton " + JSON.stringify(StyleSheet.flatten(this.props.style)));

    }
    findProduct() {
        console.log("FindDocumentButton findProduct");
        Actions.findproduct();
    }
    render() {
        return (
            <Grid style={[this.props.style, styles.container]}>
                <Row style={{ height: 20 }}>
                    <Col>

                    </Col>
                    <Col style={{ width: 20}}>
                        <ImageBackground
                            resizeMode='stretch'
                            source={require("../../assets/background.png")}
                            style={styles.container}>
                            <Icon
                                iconStyle={{ backgroundColor: 'transparent' }}
                                color='white'
                                name='caret-up' type='font-awesome'
                                size={20}
                                onPress={this.findProduct.bind(this)} />
                        </ImageBackground>

                    </Col>
                    <Col style={{ width: 20 }}>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ImageBackground
                            resizeMode='stretch'
                            source={require("../../assets/background.png")}
                            style={styles.container}>
                            <Button large buttonStyle={styles.button} title="All Products" onPress={this.findProduct.bind(this)} />
                        </ImageBackground>
                    </Col>

                </Row>
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent',
    },
    smallbutton: {
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
    }
});
