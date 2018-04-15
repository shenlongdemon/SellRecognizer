import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
import StoreLocalService from "../service/StoreLocalService";

export default class BluetoothQRFind extends React.Component {
    constructor(props) {
        super(props);
        StoreLocalService.getPhone().then(function (phone) {
            console.log("BluetoothQRFind phone " + phone);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value="nguyen thanh long"
                    size={200}
                    bgColor='black'
                    fgColor='white' />
                <OMCode
                    style={{ width: 300, height: 300 }}
                    text="nguyen thanh long"
                />
                <Text
                    onPress={() =>
                        StoreLocalService.clearAll()
                    } // New Code
                >Generate code</Text>
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
