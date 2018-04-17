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
            <View style={styles.container} >
                <Grid style={{ borderBottomWidth: 2, borderBottomColor: "gray", width: "90%" }}>
                    <Col style={styles.container}>
                        <Image
                            style={{ width: this.props.style.height - 10, height: this.props.style.height - 10 }}
                            source={{ uri: this.props.item.image.link }}
                            resizeMode="contain"
                        />
                    </Col>
                    <Col style={styles.container}>
                        <Grid>
                            <Row size={5}>

                            </Row>
                            <Row size={1}><Text>{this.props.item.category.value}</Text></Row>
                            <Row size={1}><Text>{this.props.item.name}</Text></Row>
                            <Row size={1}><Text>{this.props.item.owner.firstName}</Text></Row>
                        </Grid>
                    </Col>
                    <Col style={styles.imageArrow} >
                        <TouchableOpacity activeOpacity={.5} onPress={() => Actions.itemdetail({ item: this.props.item })}>
                            <Image
                                style={{ width: this.props.style.height / 4, height: this.props.style.height / 4 }}
                                source={require("../../assets/arrow.png")}
                            />
                        </TouchableOpacity>
                    </Col>
                </Grid>

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
    imageArrow: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: .5
    }
});
