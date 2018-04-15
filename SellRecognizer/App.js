import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import StoreLocalService from './service/StoreLocalService'


import ListItems from './screen/ListItems';
import SearchImageItem from './screen/SearchImageItem';
import FillItemInfor from './screen/FillItemInfor';
import MakeOwner from './screen/MakeOwner';
import GenCode from './screen/GenCode';
import BluetoothQRFind from './screen/BluetoothQRFind';
import ItemDetail from './screen/ItemDetail'
import BuyItem from './screen/BuyItem'
import Login from './screen/Login'
import MyProfile from './screen/MyProfile'

const TabIcon = ({ selected, title }) => {
    switch (title) {
      case 'dash':
        return (
          <Ionicons name={selected ? 'ios-speedometer' : 'ios-speedometer-outline'} size={30} color={selected ? Colors.themeColor : Colors.label} />
        )
      case 'mess':
        return (
          <Ionicons name={selected ? 'ios-mail' : 'ios-mail-outline'} size={30} color={selected ? Colors.themeColor : Colors.label} />
        )
      case 'params':
        return (
          <Ionicons name={selected ? 'ios-settings' : 'ios-settings-outline'} size={30} color={selected ? Colors.themeColor : Colors.label} />
        )
    }
  }

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { logged: false, isLoaded: false };
    }
    componentWillMount() {
        StoreLocalService.getUser().then((user) => {
            console.log("App user " + JSON.stringify(user));
            if (user != null) {
                console.log("App user is logged");

                this.setState({ logged: true, isLoaded: true });
            }
            else {
                this.setState({ logged: false, isLoaded: true });

            }
        });

    }
    
    render() {
        if (!this.state.isLoaded) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <Router>
                    <Scene key="root" navigationBarStyle={{backgroundColor: '#e65e5e'}}>

                        <Scene key="login"
                            component={Login}
                            title=""
                            initial={!this.state.logged}
                            hideNavBar
                        />
                        <Scene key="mainboard"
                            showLabel={true}
                            tabs
                            tabBarPosition="top"
                            lazy={true}
                            wrap={false}
                            type={ActionConst.RESET}
                            initial={this.state.logged}
                            tabBarStyle={{ backgroundColor: '#e65e5e' }}
                        >
                            <Scene key="bluetoothqrfind"
                                component={BluetoothQRFind}
                            
                                title="bluetooth qr find" 
                                initial
                                icon={SimpleLineIcon}
                            />

                            <Scene key="listitems"
                                component={ListItems}
                                title="Your items"
                            >
                            </Scene>
                            <Scene key="myprofile"
                                component={MyProfile}
                                title="My Profile"
                            />
                        </Scene>

                        <Scene key="itemdetail"
                            component={ItemDetail}
                            title="items detail"
                        />
                        <Scene key="buyitem"
                            component={BuyItem}
                            title="Buy Item"
                        />
                        <Scene key="searchimageitem"
                            component={SearchImageItem}
                            title="Find an image"
                        />
                        <Scene key="filliteminfor"
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
                        />


                    </Scene>
                </Router>
            );
        }
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
