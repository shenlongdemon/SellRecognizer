import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        console.log("Item " + this.props.item.id);
    }
    render() {
        return (
            <View style={[styles.container, { height: this.props.style.height }]} >
                <TouchableOpacity activeOpacity={.5} onPress={() => Actions.itemdetail({ item: this.props.item })}>
                    <Grid style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8", width: "90%" }}>
                        <Col size={2} style={styles.center} >
                            <Image
                                style={{ width: '90%', height: '80%' }}
                                source={{ uri: this.props.item.image }}
                                resizeMode="stretch"
                            />
                        </Col>
                        <Col style={{ width: 10 }} >

                        </Col>
                        <Col size={4}>
                            <Grid>

                                <Row size={5}>
                                    <Col size={4}>
                                        <Grid>
                                            <Row size={1}>

                                            </Row>
                                            <Row size={2}><Text h4>{this.props.item.name}</Text></Row>
                                            <Row size={2}><Text>{this.props.item.category.value}</Text></Row>
                                            
                                        </Grid>

                                    </Col>
                                    <Col size={1} style={styles.imageArrow} >
                                        <Image
                                            style={{ width: this.props.style.height / 4, height: this.props.style.height / 4 }}
                                            source={require("../../assets/arrow.png")}
                                        />

                                    </Col>
                                </Row>
                                <Row size={1}>
                                    <Col>
                                        {
                                            (this.props.item.buyerCode != undefined && this.props.item.buyerCode != "")
                                                ? <Text style={{ color: 'orange' }} >Buyed</Text>
                                                : (this.props.item.sellCode != undefined && this.props.item.sellCode != "")
                                                    ? <Text style={{ color: 'green' }} >Published</Text>
                                                    : <Text></Text>


                                        }
                                    </Col>
                                    <Col>
                                        <Text style={{ color: 'green', flex:1, textAlign:'right' }}>{this.props.item.price + "$"}</Text>
                                    </Col>
                                </Row>
                            </Grid>
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
    }
});
