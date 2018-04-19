import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        console.log("Item " + this.props.item.id);
    }
    render() {
        return (
            <View style={[styles.container, { height: this.props.style.height }]} >
                <TouchableOpacity activeOpacity={.5} onPress={() => Actions.productdetail({ item: this.props.item })}>
                    <Grid style={{ borderBottomWidth: 2, borderBottomColor: "gray", width: "90%" }}>
                        <Col style={styles.center} >
                            <Image
                                style={{ width: '80%', height: '80%' }}
                                source={{ uri: this.props.item.image.link }}
                                resizeMode="contain"
                            />
                        </Col>
                        <Col style={styles.center}>
                            <Grid>
                                <Row size={2}>

                                </Row>
                                <Row size={1}><Text>{this.props.item.category.value}</Text></Row>
                                <Row size={1}><Text>{this.props.item.name}</Text></Row>
                                <Row size={1}><Text>{this.props.item.owner.firstName}</Text></Row>
                                <Row size={1}>

                                    {
                                        (this.props.item.sellCode != undefined && this.props.item.sellCode != "")
                                            ? <Text style={{ color: 'green' }} >Published</Text>
                                            : <Text></Text>
                                    }

                                </Row>
                            </Grid>
                        </Col>
                        <Col style={styles.imageArrow} >

                            <Image
                                style={{ width: this.props.style.height / 4, height: this.props.style.height / 4 }}
                                source={require("../../assets/arrow.png")}
                            />

                        </Col>
                    </Grid>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
