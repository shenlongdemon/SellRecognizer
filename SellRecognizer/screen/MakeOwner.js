import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from '../service/CommonService'
import DetectService from '../components/DetectService'

export default class MakeOwner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {             
            firstName: "",
            lastName: "",
            address:"",
            zipCode:null,
            state:"",
            country:"",
            password:"",
            position:{},
            weather:{}
        };
    }
    componentDidMount() {
        this.setState({ isMounted: true })
        DetectService.getDeviceInfo(this);

    }
    getItem(){        
        var item = this.props.item;
        item.owner = {};
        item.owner.firstName = this.state.firstName;
        item.owner.lastName = this.state.lastName;
        item.owner.address = this.state.address;
        item.owner.zipCode = this.state.zipCode;
        item.owner.state = this.state.state;
        item.owner.country = this.state.country;
        item.owner.password = this.state.password;
        item.owner.position = this.state.position;
        item.owner.weather = this.state.weather;
        return item;
    }
    insertItem(){
        console.log("MakeOwner.insertItem item " + JSON.stringify(item));
        var self = this;
        var item = this.getItem();
        CommonService.insertItem(item)
            .then(function(res){
                console.log("MakeOwner.insertItem res " + JSON.stringify(res));

                let id = res.Data.id;
                
                
            });

    }
    render() {
        return (
            <View style={styles.container}>

                <Grid>
                    <Row style={{ height: 100 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: this.props.item.image.link }}
                        />
                    </Row>
                    <Row>

                        <Grid>                           
                            <Row >
                                <Text>First Name</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ firstName: text })}
                                    value={this.state.firstName}
                                />
                            </Row>          
                            <Row >
                                <Text>Last Name</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ lastName: text })}
                                    value={this.state.lastName}
                                />
                            </Row>     
                            <Row >
                                <Text>Address</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ address: text })}
                                    value={this.state.address}
                                />
                            </Row>     
                            <Row >
                                <Text>ZipCode</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ zipCode: text })}
                                    value={this.state.zipCode}
                                />
                            </Row>     
                            <Row >
                                <Text>State</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ state: text })}
                                    value={this.state.state}
                                />
                            </Row>     
                            <Row >
                                <Text>Country</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ country: text })}
                                    value={this.state.country}
                                />
                            </Row>     
                            <Row >
                                <Text>Password</Text>
                                <TextInput secureTextEntry={true}
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    value={this.state.password}
                                />
                            </Row>     
                                              

                        </Grid>



                    </Row>
                    <Row style={{ height: 50 }}>
                        <Text
                            onPress={() => this.insertItem()
                                
                            } // New Code
                        >Done</Text>
                    </Row>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

