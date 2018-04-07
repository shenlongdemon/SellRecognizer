import React from 'react';
import { StyleSheet, Text, View, Image, Geolocation, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from 'react-native-material-dropdown';
import CommonService from '../service/CommonService'

export default class FillItemInfor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],             
            name: "",
            description: ""

        };
    }
    componentDidMount() {
        this.setState({ isMounted: true })
        this.setState({name:this.props.itemName});
        this.setState({description:this.props.image.title});
        this.loadCategories();

    }
    loadCategories() {
        var self = this;
        CommonService.getCategories()
            .then(function (res) {
                self.setState(
                    (prevState) => ({
                        categories: res.Data
                    })
                );
                console.log("CommonService.getCategories state " + JSON.stringify(this.state));
            });
    }
    getItem(){
        return {
            name: this.state.name,
            description: this.state.description,
            image: this.props.image,
            ownerId: "+84905690200"
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <Grid>
                    <Row style={{ height: 100 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: this.props.image.link }}
                        />
                    </Row>
                    <Row>

                        <Grid>
                            <Row >
                                <Dropdown containerStyle={{ flex: 1, height: 30 }}
                                    label='Select category'
                                    data={this.state.categories}
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
                                <Text>Description</Text>
                                <TextInput editable={true}
                                    multiline = {true}
                                    numberOfLines = {4}
                                    style={{ flex: 1, height: 120, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ description: text })}
                                    value={this.state.description}
                                />
                            </Row>
                            <Row >

                            </Row>
                            <Row >

                            </Row>

                        </Grid>



                    </Row>
                    <Row style={{ height: 50 }}>
                        <Text
                            onPress={() => 
                                Actions.makeowner({ item: this.getItem() })
                            } // New Code
                        >Make ouwer for it</Text>
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
