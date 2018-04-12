import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class ItemDetail extends CommomPage {
    constructor(props) {
        super(props);
        console.log(JSON.stringify(this.props));
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Item Detail {this.props.item.name} </Text>
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
