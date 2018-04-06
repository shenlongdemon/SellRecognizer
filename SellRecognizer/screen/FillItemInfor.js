import React from 'react';
import { StyleSheet, Text, View,Image, Geolocation } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class FillItemInfor extends React.Component {
    constructor(props) {
        super(props)       
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: this.props.image.link }}
                />
                <Text>Add Item</Text>
                
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
