import React from 'react';
import { StyleSheet,  View, Image, Geolocation, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'

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
    componentWillMount(){
        var self = this;
        StoreLocalService.getUser().then((user) => {
            DetectService.getDeviceInfo().then((data) => {
                user.position = data.position;
                user.weather = data.weather;
                self.setState({ user: user });
                console.log("PublishSell componentDidMount user = " + JSON.stringify(self.state.user));
            }).catch((ex) => {
                console.log("" + ex);
            });
        }).catch((ex) => {
            console.log("" + ex);
        })
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
    submit(){
        var item = this.getItem();
        item.owner = this.state.user;
        CommonService.insertItem(item)
            .then(function (res) {
                console.log("MakeOwner.insertItem res " + JSON.stringify(res));
                Actions.gencode({ item: res.Data });
            });
    }
    render() {
        return (
            <CommonPage>

                <Grid>
                    <Row style={{ height: 100 }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.selectImage()}>
                            <Image
                                style={{ height: 100, width: 100 }}
                                source={(this.state.image != undefined && this.state.image != "") ? { uri: this.state.image } :
                                    require('../assets/library.png')

                                }
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </Row>
                    <Row>

                        <Grid>
                            <Row >
                                <Dropdown containerStyle={{ flex: 1, height: 30 }}
                                    label='Select category'
                                    data={this.state.categories}
                                    onChangeText={(value, index, data) => this.setState({ category: data[index] })}
                                />
                            </Row>
                            <Row >
                                <Text>Name</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    value={this.state.name}
                                />
                            </Row>
                            <Row >
                                <Text>Price</Text>
                                <TextInput
                                    style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ price: text })}
                                    value={this.state.price}
                                />
                            </Row>
                            <Row >
                                <Text>Description</Text>
                                <TextInput editable={true}
                                    multiline={true}
                                    numberOfLines={4}
                                    style={{ flex: 1, height: 120, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ description: text })}
                                    value={this.state.description}
                                />
                            </Row>

                        </Grid>

                    </Row>
                    <Row style={{ height: 50 }}>
                        <Button buttonStyle={styles.buttonLogin} title="Login" onPress={this.submit.bind(this)} backgroundColor="#eda751" />

                    </Row>
                </Grid>
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
