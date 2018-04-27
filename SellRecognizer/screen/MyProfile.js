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
import { ImagePicker,ImageManipulator } from 'expo';
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

    }
    componentDidMount() {
        this.loadUser();
    }
    loadUser() {
        var self = this;
        StoreLocalService.getUser().then((user) => {
            console.log("image = " + user.image);
            var obj = this.state;
            Object.assign(obj, user);
            self.setState(obj);
        });
    }
    updateProfile() {

        var self = this;

        console.log("self.user " + JSON.stringify(self.state));
        var user = self.state;
        CommonService.updateProfile(self.state.id, user).then((res) => {
            if (res.Status == 1) {
                StoreLocalService.setUser(res.Data);
                Actions.reset("mainboard");
            }
        });

    }
    logout() {

        StoreLocalService.clearAll();
        Actions.reset('login');
    }
    selectImage = () => {
        
        console.log("pick image ");
        var self = this;
        ImagePicker.launchImageLibraryAsync({
            //allowsEditing: true,
            base64: true,
            //aspect: [4, 3],
            quality: 0
        }).then((result) => {
            var ratio = 100 / result.width;
            var height = result.height * ratio;
            var width = result.width * ratio;
            ImageManipulator.manipulate(result.uri, [{ resize: { height: height, width:width}}],
                { format: 'jpg',base64:true,compress:0 }).then((res) => {
                    console.log("image selected " + JSON.stringify(res));
                    self.setState({ image: "data:image/jpg;base64," + res.base64 });
                    console.log("pick image " + JSON.stringify(self.state));
                });
        });
    }
    render() {
        return (
            <CommonPage styles={styles.container}>
                <Grid>
                    <Row size={1} >
                        <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }} activeOpacity={.5} onPress={() => this.selectImage()}>


                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={
                                    (this.state.image == undefined || this.state.image == "")
                                        ? require('../assets/library.png')
                                        :
                                        { uri: this.state.image }

                                }
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                    </Row>
                    <Row size={3}>
                        <Grid>
                            <Row >
                                <Col size={1}>
                                    <FormLabel>First Name</FormLabel>
                                </Col>
                                <Col size={2}>
                                    <FormInput
                                        containerStyle={styles.formInputContainerStyle}
                                        value={this.state.firstName}
                                        style={styles.rowField}
                                        onChangeText={(firstName) => this.setState({ firstName: firstName })}
                                        placeholder="First Name"
                                        placeholderTextColor='gray'
                                        inputStyle={{ color: 'black' }} />
                                </Col>


                            </Row>
                            <Row style={styles.rowField}>
                                <Col size={1}>
                                    <FormLabel>Last Name</FormLabel>
                                </Col>
                                <Col size={2}>
                                    <FormInput
                                        containerStyle={styles.formInputContainerStyle}
                                        style={styles.rowField}
                                        onChangeText={(text) => this.setState({ lastName: text })}
                                        value={this.state.lastName}
                                        placeholder="Last Name"
                                        placeholderTextColor='gray'
                                        inputStyle={{ color: 'black' }} />
                                </Col>
                            </Row>
                            <Row style={styles.rowField}>
                                <Col size={1}>
                                    <FormLabel>Zip code</FormLabel>
                                </Col>
                                <Col size={2}>
                                    <FormInput
                                        containerStyle={styles.formInputContainerStyle}
                                        style={styles.rowField}
                                        onChangeText={(text) => this.setState({ zipCode: text })}
                                        value={this.state.zipCode}
                                        placeholder="Zip code"
                                        placeholderTextColor='gray'
                                        inputStyle={{ color: 'black' }} />
                                </Col>
                            </Row>
                            <Row style={styles.rowField}>
                                <Col size={1}>
                                    <FormLabel>State</FormLabel>
                                </Col>
                                <Col size={2}>
                                    <FormInput
                                        style={styles.rowField}
                                        containerStyle={styles.formInputContainerStyle}
                                        onChangeText={(text) => this.setState({ state: text })}
                                        value={this.state.state}
                                        placeholder="State"
                                        placeholderTextColor='gray'
                                        inputStyle={{ color: 'black' }} />
                                </Col>
                            </Row>
                            <Row style={styles.rowField}>
                                <Col size={1}>
                                    <FormLabel>Country</FormLabel>
                                </Col>
                                <Col size={2}>
                                    <FormInput
                                        style={styles.rowField}
                                        containerStyle={styles.formInputContainerStyle}
                                        onChangeText={(text) => this.setState({ country: text })}
                                        value={this.state.country}
                                        placeholder="Country"
                                        placeholderTextColor='gray'
                                        inputStyle={{ color: 'black' }} />
                                </Col>
                            </Row>

                            <Row style={{
                                height: 70
                            }}>


                                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Button  buttonStyle={styles.buttonLogin} title="Update" onPress={this.updateProfile.bind(this)} backgroundColor="#eda751" />

                                </Col>
                                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Button  buttonStyle={styles.buttonLogin} title="Logout" onPress={this.logout.bind(this)} backgroundColor="red" />

                                </Col>

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

    },
    formInputContainerStyle: {
        height: 35
    },
    buttonLogin: {
        borderColor: "transparent",
        borderRadius: 10

    },
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
