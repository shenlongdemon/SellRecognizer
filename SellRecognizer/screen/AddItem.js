import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class AddItem extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add Item</Text>
                <Text
                    onPress={() => Actions.searchimageitem()} // New Code
                >Select Image</Text>
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
