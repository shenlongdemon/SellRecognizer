import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import CommonPage from "./CommonPage"
export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(JSON.stringify(this.props));
    }
    render() {
        return (
            <CommonPage style={styles.container}>
                <Text> Item Detail  </Text>
            </CommonPage>
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