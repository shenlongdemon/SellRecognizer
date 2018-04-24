import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'

import { Actions } from 'react-native-router-flux'; // New code
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import CommonPage from "./CommonPage"
import { Col, Row, Grid } from "react-native-easy-grid";
import StoreLocalService from "../service/StoreLocalService";
import CommonService from "../service/CommonService";
import { ImagePicker } from 'expo';
export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            zipCode: "",
            state: "",
            address: "",
            country: "",
            image: ""
        };
        this.loadUser();
    }
    loadUser() {
        var self = this;
        StoreLocalService.getUser().then((user) => {
            user.image = (user.image == undefined || user.image == "") ? "../assets/library.png" : user.image;
            console.log("image = " + user.image);
            var obj = this.state;
            Object.assign(obj, user);
            self.setState(obj);
        });
    }
    updateProfile() {

        var self = this;

        console.log("self.user " + JSON.stringify(self.state));

        // CommonService.updateProfile(self.state.user.id, self.state.user).then((res) => {
        //     if (res.Status == 1) {
        //         StoreLocalService.setUser(res.Data);                
        //     }
        // });

    }
    logout() {

        StoreLocalService.clearAll();

    }
    selectImage = () => {

        console.log("pick image ");
        var self = this;
        ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
        }).then((result) => {
            console.log("image selected " + JSON.stringify(result));
            self.setState({ image: "data:image/jpg;base64," + result.base64 });
            console.log("pick image " + JSON.stringify(self.state));

        });
    }
    render() {
        return (
            <CommonPage styles={styles.container}>
                <Grid>
                    <Row size={1}>
                        <Col size={1}>
                            <TouchableOpacity activeOpacity={.5} onPress={() => this.selectImage()}>
                                <Image
                                    style={{ height: "100%", width: "100%" }}
                                    source={(this.state.image != undefined && this.state.image != "") ? { uri: this.state.image } :
                                        require('../assets/library.png')

                                    }
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col size={2}>
                            <Grid>
                                <Row >
                                    <FormLabel>First Name</FormLabel>
                                    <FormInput containerStyle={{ height: 30 }} value={this.state.firstName} style={styles.rowField} onChangeText={(firstName) => this.setState({ firstName: firstName })} placeholder="First Name" placeholderTextColor='gray' inputStyle={{ color: 'black' }} />
                                </Row>
                                <Row style={styles.rowField}>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormInput containerStyle={{ height: 30 }} style={styles.rowField} onChangeText={(text) => this.setState({ password: text })} placeholder="First Name" placeholderTextColor='gray' inputStyle={{ color: 'black' }} />
                                </Row>
                            </Grid>
                        </Col>
                    </Row>
                    <Row size={3}>
                        <Grid>
                            <Row style={styles.rowField}>
                                <FormLabel>Address</FormLabel>
                                <FormInput style={styles.rowField} onChangeText={(text) => this.setState({ password: text })} placeholder="First Name" placeholderTextColor='gray' inputStyle={{ color: 'black' }} />
                            </Row>
                            <Row style={styles.rowField}>
                                <FormLabel>Zip Code</FormLabel>
                                <FormInput style={styles.rowField} onChangeText={(text) => this.setState({ password: text })} placeholder="First Name" placeholderTextColor='gray' inputStyle={{ color: 'black' }} />
                            </Row>
                            <Row style={styles.rowField}>
                                <FormLabel>State</FormLabel>
                                <FormInput style={styles.rowField} onChangeText={(text) => this.setState({ password: text })} placeholder="First Name" placeholderTextColor='gray' inputStyle={{ color: 'black' }} />
                            </Row>
                            <Row style={styles.rowField}>
                                <FormLabel>Country</FormLabel>
                                <FormInput style={styles.rowField} onChangeText={(text) => this.setState({ password: text })} placeholder="First Name" placeholderTextColor='gray' inputStyle={{ color: 'black' }} />
                            </Row>
                            <Row style={styles.rowField}>
                                <Button onPress={this.updateProfile.bind(this)} title="Register Here" />
                                <Button onPress={this.logout.bind(this)} title="Log out" />

                            </Row>
                        </Grid>
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
    rowField: {
        height: 50,

    }
});

{/* 
                                firstName
:
"Omid"
phone
:
"+1234567890"
password
:
"123"
lastName
:
"Omid"
address
:
"1003 ST"
zipCode
:
"11000"
state
:
"Seattle"
country
:
"USA"
                                
                                */}
