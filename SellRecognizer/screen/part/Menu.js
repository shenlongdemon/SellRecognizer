import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'red',
    },
});

export default class Menu extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={Actions.pop} title="Back" />
            </View >
        );
    }
}
