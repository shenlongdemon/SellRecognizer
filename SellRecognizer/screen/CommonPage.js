import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

export default class CommonPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("CommonPage " + JSON.stringify(StyleSheet.flatten(this.props.style)));
    }
    render() {
        return (
                       
                <View style={styles.container}>
                    {this.props.children}

                    <View style={{height:7, backgroundColor:'#c6394a'}} >

                    </View>
                </View>
            //      <ImageBackground
            //      resizeMode='stretch'
            //      source={require("../assets/background.png")}
            //      style={styles.container}
            //  >    
            // </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#e6e6e6"
    }

});
