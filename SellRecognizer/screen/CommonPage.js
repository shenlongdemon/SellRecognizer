import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class CommonPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("CommonPage " + JSON.stringify(StyleSheet.flatten(this.props.style)));
    }
    render() {
        return (
            <View style={styles.container}>
            
                {this.props.children}

                <View style={{ height: 7, backgroundColor: '#c6394a' }} >
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6e6e6"
    }

});
