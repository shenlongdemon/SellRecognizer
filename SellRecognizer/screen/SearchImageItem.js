import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import SearchImage from '../components/SearchImage'
import GridView from 'react-native-super-grid';
export default class SearchImageItem extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            images: [],
            selectedImage:{id:""}
        };
    }
    onSelectImage = (image) => {
        this.setState(
            (prevState) => ({
                selectedImage: image
            })
           );
        console.log("selectedImageId " + this.state.selectedImage);
      }
    getImage(keyword) {
        var self = this;
        SearchImage.getImages("rolex")
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
                <TextInput
                    style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ keyword: text })}
                    value={this.state.keywork}
                />
                <Text
                    onPress={() => this.getImage(this.state.keywork)} // New Code
                >Get Image</Text>

                <GridView
                    itemDimension={130}
                    items={this.state.images}
                    renderItem={item => (
                        <View style={{backgroundColor: this.state.selectedImage.id == item.id ? 'blue' : 'white'}}>
                            <TouchableOpacity activeOpacity = { .5 } onPress={() => this.onSelectImage(item) }>
                            <Image
                                    style={{ width: 50, height: 50 }}
                                    source={{ uri: item.link }}
                                />
                            </TouchableOpacity>
                            
                        </View>
                    )}
                />
                <Text
        onPress={() => Actions.filliteminfor({image:this.state.selectedImage})} // New Code
        >Next</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
