import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class CommonPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("CommonPage" + JSON.stringify(StyleSheet.flatten(this.props.style)));
    }
    render() {
        return (
            <ImageBackground
                resizeMode='stretch'
                source={require("../assets/background.png")}
                style={styles.container}
            >
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});
