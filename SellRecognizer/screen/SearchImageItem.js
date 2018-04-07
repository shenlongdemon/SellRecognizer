import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import SearchImage from '../components/SearchImage'
import GridView from 'react-native-super-grid';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class SearchImageItem extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            images: [],
            selectedImage: { id: "" }
        };
    }
    onSelectImage = (image) => {
        this.setState(
            (prevState) => ({
                selectedImage: image
            })
        );
        console.log("selectedImage " + this.state.selectedImage);
    }
    getImage() {
        var self = this;
        SearchImage.getImages(this.state.keyword)
            .then(function (res) { // (A)      
                console.log(JSON.stringify(res));
                self.setState({ images: res.Data });
            })
            .catch(function (error) { // (B)        
                alert("Error " + JSON.stringify(error));
                console.error('An error occurred', error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Grid>
                    <Row style={{ height: 50 }}>
                        <Grid>
                            <Col>
                                <TextInput
                                    style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ keyword: text })}
                                    value={this.state.keyword}
                                />
                            </Col>
                            <Col style={{ width: 100 }}>
                                <Text style={{ flex: 1}}
                                    onPress={() => this.getImage()} // New Code
                                >Get Image</Text>
                            </Col>
                        </Grid>
                    </Row>
                    <Row>
                        <GridView
                            itemDimension={50}
                            items={this.state.images}
                            renderItem={item => (
                                <View style={{ backgroundColor: this.state.selectedImage.id == item.id ? 'blue' : 'white' }}>
                                    <TouchableOpacity activeOpacity={.5} onPress={() => this.onSelectImage(item)}>
                                        <Image
                                            style={{ width: 50, height: 50 }}
                                            source={{ uri: item.link }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            )}
                        />
                    </Row>
                    <Row style={{ height: 50 }}>
                        <Text
                            onPress={() => Actions.filliteminfor({ image: this.state.selectedImage, itemName:this.state.keyword })} // New Code
                        >Next</Text>
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
