import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'

export default class ItemInfo extends React.Component {
    constructor(props) {
        super(props);
        console.log("Item " + this.props.item.id);
    }
    render() {
        let dt = new Date(this.props.item.owner.time).toLocaleString();
        return (
            <Grid>
                <Row size={2}>
                    <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }} activeOpacity={.5} onPress={() => alert('Bluetooth code: ' + this.props.item.bluetoothCode)}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: this.props.item.image }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Row>
                <Row size={4}>
                    <Grid style={styles.container}>
                        <Row>
                            <Text h4>{this.props.item.name}</Text>
                        </Row>
                        <Row >
                            <Text >{this.props.item.category.value}</Text>

                        </Row>
                        <Row>
                            <Text style={{ color: 'green' }}>{this.props.item.price + "$"}</Text>
                        </Row>

                        <Row >
                            <Text>{"Owner: " + this.props.item.owner.firstName + " " + this.props.item.owner.lastName}</Text>
                        </Row>
                        <Row style={{ height: 5 }}>
                        </Row>
                        <Row >
                            <Text style={{ textAlign: 'center', width: "100%" }} >
                                {"Purchased at: " + dt + "\n" + "Address: " + this.props.item.owner.weather.name}
                            </Text>
                        </Row>
                        <Row style={{ height: 5 }}>
                        </Row>

                    </Grid>

                </Row>
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageArrow: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: .5,
        width: 30
    }
});
