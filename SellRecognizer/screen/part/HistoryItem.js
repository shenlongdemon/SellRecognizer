import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'

export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        let action = this.props.user.index == 0 ? "Produced on " : (this.props.user.index == 1 ? "Is buying on " : "Purchased on ")
        let dt = new Date(this.props.user.weather.dt * 1000).toLocaleString();

        return (
            
            <View style={[styles.container, { height: this.props.style.height }]} >
                
                    <Grid>
                        <Col style={{width:30, height: '100%'}}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={require("../../assets/historyline.png")}
                                resizeMode="contain"
                            />
                        </Col>
                        
                        <Col size={3}>
                            <Grid style={{ borderBottomWidth: 0.5, borderBottomColor: "gray", width: "90%" }}>
                                <Row><Text h4>{this.props.user.firstName + ' ' + this.props.user.lastName}</Text></Row>
                                <Row>
                                    <Text>{action + ' ' + dt}</Text>
                                </Row>
                                <Row><Text>{"Address " + this.props.user.weather.name}</Text></Row>
                                
                            </Grid>
                        </Col>
                        <Col size={1}>
                            <Image
                                style={{ width: '80%', height: '80%' }}
                                source={(this.props.user.image != undefined && this.props.user.image != "") ? { uri: this.props.user.image } :
                                        require('../../assets/user.png')

                                    }
                                resizeMode="contain"
                            />
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
