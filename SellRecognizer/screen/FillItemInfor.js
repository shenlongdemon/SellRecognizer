import React from 'react';
import { StyleSheet, View, Image, Geolocation, TouchableOpacity } from 'react-native';
import { FormLabel, FormValidationMessage, FormInput, Button, Text,Icon } from 'react-native-elements'

import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from 'react-native-material-dropdown';
import CommonService from '../service/CommonService'
import CommonPage from "./CommonPage"
import { ImagePicker } from 'expo';
import DetectService from '../components/DetectService'
import StoreLocalService from "../service/StoreLocalService";

export default class FillItemInfor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.item
        };
    }
    componentDidMount() {
        this.loadCategories();

    }
    componentWillMount() {
        var self = this;

        CommonService.getUserInfo().then((user) => {
            self.setState({ user: user });
        });
    }
    loadCategories() {
        var self = this;
        CommonService.getCategories()
            .then(function (res) {
                self.setState({ categories: res.Data });
                console.log("CommonService.getCategories state " + JSON.stringify(this.state));
            });
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
    getItem() {
        var item = {
            name: this.state.name,
            price: this.state.price,
            description: this.state.description,
            image: this.state.image,
            category: this.state.category
        };
        console.log("FillItemInfor getItem " + JSON.stringify(item));
        return item;
    }
    submit() {
        var item = this.getItem();
        item.owner = this.state.user;
        CommonService.insertItem(item)
            .then(function (res) {
                console.log("MakeOwner.insertItem res " + JSON.stringify(res));
                Actions.gencode({ code: res.Data.code });
            });
    }
    search(){
        Actions.searchimageitem();
    }
    render() {
        return (
            <CommonPage>

                <Grid>
                    <Row style={{
                        height: 200
                    }} >
                        <Col size={1} ></Col>
                        <Col size={5} style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity activeOpacity={.5} onPress={() => this.selectImage()}>
                                <Image
                                    style={{ height: 200, width: 200 }}
                                    source={(this.state.image != undefined && this.state.image != "") ? { uri: this.state.image } :
                                        require('../assets/library.png')

                                    }
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col size={1}>
                            <Icon name='search'
                                type='font-awesome'
                                color='#eda751'
                                onPress={() => this.search.bind(this)} />
                        </Col>

                    </Row>

                    <Row style={{ height: 70 }} >
                        <Col style={{ width: 20 }}></Col>
                        <Col>
                            <Dropdown containerStyle={{ height: "100%", width: "80%" }}
                                label='Select category'
                                data={this.state.categories}
                                onChangeText={(value, index, data) => this.setState({ category: data[index] })}
                            />
                        </Col>

                    </Row>
                    <Row style={{ height: 50 }}>
                        <FormInput
                            style={[styles.formInputStyle]}
                            containerStyle={styles.formInputContainerStyle}
                            onChangeText={(text) => this.setState({ name: text })}
                            value={this.state.name}
                            placeholderTextColor='gray'
                            placeholder='Name of item'
                        />
                        <FormValidationMessage>{'Fill name'}</FormValidationMessage>
                    </Row>
                    <Row style={{ height: 50 }}>
                        <FormInput
                            style={[styles.formInputStyle]}
                            keyboardType='numeric'
                            containerStyle={styles.formInputContainerStyle}
                            onChangeText={(text) => this.setState({ price: text })}
                            value={this.state.price}
                            placeholder='Make price'
                            placeholderTextColor='gray'

                        />
                        <FormValidationMessage>{'Fill price'}</FormValidationMessage>

                    </Row>
                    <Row >
                        <FormInput
                            numberOfLines={4}
                            multiline={true}
                            containerStyle={{ height: "100%", width:'90%', borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ price: text })}
                            value={this.state.description}
                            onChangeText={(text) => this.setState({ description: text })}
                            placeholder="Description here"
                            placeholderTextColor='gray'

                        />
                    </Row>


                    <Row style={{
                        height: 70, alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Col sixe={2}></Col>
                        <Col sixe={6}>
                            <Button large style={{ width: "100%" }} buttonStyle={styles.buttonLogin} title="Done" onPress={this.submit.bind(this)} backgroundColor="#eda751" />

                        </Col>
                        <Col sixe={2}></Col>

                    </Row>
                </Grid>
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formInputContainerStyle: {
        height: 35
    },
    formInputStyle: {

    },
    buttonLogin: {
        borderColor: "transparent",
        borderRadius: 10,
        

    },
});
