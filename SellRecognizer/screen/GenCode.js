import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import QRCode from 'react-native-qrcode';
import OMCode from '../components/OMCode';
export default class GenCode extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={this.props.item.owner.code}
                    size={200}
                    bgColor='purple'
                    fgColor='white' />
                <OMCode
                    style={{width:300, height:300}}
                    text={this.props.item.owner.code}
                />
                <Text onPress={() => Actions.reset('listitems')}>Done</Text>
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
