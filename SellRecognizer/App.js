import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import ListItems from './screen/ListItems';
import SearchImageItem from './screen/SearchImageItem';
import FillItemInfor from './screen/FillItemInfor';
import MakeOwner from './screen/MakeOwner';
import GenCode from './screen/GenCode';
import BluetoothQRFind from './screen/BluetoothQRFind';
import ItemDetail from './screen/ItemDetail'
export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root" >
                    <Scene key="tab" showLabel={true} tabs tabBarPosition="top" lazy={true} wrap={false} initial>
                        <Scene key="bluetoothqrfind"
                            component={BluetoothQRFind}
                            title="Your items"
                        />
                        <Scene key="listitems"
                            component={ListItems}
                            title="Your items"
                        />
                        <Scene key="searchimageitem"
                            component={SearchImageItem}
                            title="Select one"
                        />
                    </Scene>
                    <Scene key="itemdetail"  component={ItemDetail}
                            title="Detail for item" />

                    {/* <Scene key="filliteminfor"
                        component={FillItemInfor}
                        title="Fill information"
                    />
                    <Scene key="makeowner"
                        component={MakeOwner}
                        title="Make Owner"
                    />
                    <Scene key="gencode"
                        component={GenCode}
                        title="Gen Owner"
                        hideNavBar={true}
                    /> */}


                </Scene>
            </Router>
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
