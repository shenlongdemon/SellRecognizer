import React from 'react';
import { StyleSheet, View, Image, ImageResizeMode, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import CommonPage from "./CommonPage"
import CommonService from "../service/CommonService";
import StoreLocalService from "../service/StoreLocalService";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            phone: "",
            password: ""
        };
    }

    login() {
        console.log("click login " + JSON.stringify(this.state));
        var phone = this.state.phone;
        CommonService.login(phone, this.state.password)
            .then(function (res) {
                console.log("Login login " + JSON.stringify(res));

                if (res.Status == 1) {
                    StoreLocalService.setPhone(phone);
                    StoreLocalService.setUser(res.Data);
                    Actions.mainboard();
                }
                else {
                    alert(res.Message);
                }

            });
    }
    render() {
        return (
            <View style={styles.containerLogin}>
                  <ImageBackground
                 resizeMode='stretch'
                 source={require("../assets/background.png")}
                 style={styles.containerLogin}
             >    
           

                <Grid>
                    <Row size={1} style={styles.container}>
                        <Image
                            style={{ height: 140, width: 140 }}
                            resizeMode="stretch"
                            source={require("../assets/logo.png")}
                        />
                    </Row>
                    <Row size={2}>
                        <Grid>
                            <Row style={{ height: 50 }}>
                                <Col size={1}></Col>
                                <Col size={7}>
                                    <FormInput onChangeText={(text) => this.setState({ phone: text })} placeholder="PHONE" placeholderTextColor='white' inputStyle={{ color: 'white' }} />
                                </Col>
                                <Col size={1}></Col>

                            </Row>
                            <Row style={{ height: 50 }}>
                                <Col size={1}></Col>
                                <Col size={7}>
                                    <FormInput secureTextEntry onChangeText={(text) => this.setState({ password: text })} placeholder="PASSWORD" placeholderTextColor='white' inputStyle={{ color: 'white' }} />
                                </Col>
                                <Col size={1}></Col>

                            </Row>
                            <Row style={{ height: 10 }} >
                            </Row>
                            <Row style={{ height: 50 }}>
                                <Col size={1}></Col>
                                <Col size={7}  >
                                    <Button buttonStyle={styles.buttonLogin} title="Login" onPress={this.login.bind(this)} backgroundColor="#eda751" />
                                </Col>
                                <Col size={1}></Col>
                            </Row>
                            <Row style={{ height: 5 }} >
                            </Row>
                            <Row style={{ height: 30 }} >
                                <Text style={styles.text} > Forget Your Password?</Text>
                            </Row>
                            <Row style={{ height: 30 }} >
                                <Text style={{ fontSize: 25, color: 'white', textAlign: 'center', width: '100%' }} > OR</Text>
                            </Row>
                            <Row style={styles.containerCenter}>
                                <Image
                                    style={{ height: 70, width: 70 }}
                                    resizeMode="contain"
                                    source={require("../assets/fingerprint.png")}
                                />
                            </Row>
                            <Row>
                                <Grid>
                                    <Row style={{ height: 25 }} >
                                    </Row>
                                    <Row style={{ height: 20 }} >
                                        <Text style={styles.text}> If you already didn't have an account</Text>
                                    </Row>
                                    <Row>
                                        <Col size={1}></Col>
                                        <Col size={7}>
                                            <Button buttonStyle={styles.buttonRegister} title="Register Here" />
                                        </Col>
                                        <Col size={1}></Col>
                                    </Row>

                                </Grid></Row>
                        </Grid>
                    </Row>

                </Grid>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerLogin: {
        flex: 1,
       
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    text: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    buttonLogin: {
        borderColor: "transparent",
        borderRadius: 10,
        width: '100%',

    },
    buttonRegister: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        backgroundColor: "transparent",
    }
});
