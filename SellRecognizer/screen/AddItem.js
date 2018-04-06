import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import DectWeather from '../components/DectWeather'

export default class AddItem extends React.Component {
    constructor() {
        super();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var crd = position.coords;
                console.log('Your current position is:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                DectWeather.getWeather(crd.latitude, crd.longitude)
                .then(function(data){
                    console.log("DectWeather.getWeather " + JSON.stringify(data));
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },

        );
    }
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
