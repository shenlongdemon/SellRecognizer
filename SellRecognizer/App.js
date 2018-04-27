import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import StoreLocalService from './service/StoreLocalService';


import ListItems from './screen/ListItems';
import SearchImageItem from './screen/SearchImageItem';
import FillItemInfor from './screen/FillItemInfor';
import MakeOwner from './screen/MakeOwner';
import GenCode from './screen/GenCode';
import BluetoothQRFind from './screen/BluetoothQRFind';
import ItemDetail from './screen/ItemDetail';
import PaymentProduct from './screen/PaymentProduct';
import Login from './screen/Login';
import MyProfile from './screen/MyProfile';
import PublishSell from './screen/PublishSell';
import FindProduct from './screen/FindProduct';
import LookAround from './screen/LookAround';
import ProductDetail from './screen/ProductDetail';
import History from './screen/History';
import ListProducts from './screen/ListProducts';
import CircleCode from './screen/CircleCode';

const TabIcon = ({ title, focused }) => {
    let image;
    switch (title) {
        case 'bluetoothqrfind':
            image = focused ? require('./assets/browse.png') : require('./assets/browse.png');
            break;
        case 'listitems':
            image = focused ? require('./assets/documents.png') : require('./assets/documents.png');
            break;
        case 'myprofile':
            image = focused ? require('./assets/myprofile.png') : require('./assets/myprofile.png');
            break;
    }

    return (<Image source={image} style={{ width: 30, height: 30 }} resizeMode="contain" />);
}
export default class App extends React.Component {
    constructor() {
        super();
        console.disableYellowBox = true;
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
                <Router >
                    <Scene key="root"
                        navigationBarStyle={{ backgroundColor: '#e65e5e' }}
                        titleStyle={{ color: 'white' }}
                        backButtonImage={require('./assets/back.png')}
                        leftButtonIconStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                        backTitle={null}

                    >
                        <Scene key="login"
                            component={Login}
                            title=""
                            initial={!this.state.logged}
                            hideNavBar
                        />

                        <Scene key="mainboard"
                            showLabel={true}
                            tabs
                            hideNavBar
                            //tabBarPosition="top"
                            lazy={true}
                            wrap={false}
                            type={ActionConst.RESET}
                            initial={this.state.logged}
                            tabBarStyle={{ backgroundColor: '#e65e5e' }}
                        >
                            <Scene key="bluetoothqrfind"
                                title="bluetoothqrfind"
                                icon={TabIcon}
                            >
                                <Scene key="bluetoothqrfind"
                                    component={BluetoothQRFind}
                                    title="uGuta"
                                    initial
                                    icon={TabIcon}
                                    tabBarLabel="Look Around"
                                >
                                </Scene>
                                <Scene key="lookaround"
                                    component={LookAround}
                                    title="Look Around"

                                >
                                </Scene>
                            </Scene>

                            <Scene key="listitems"
                                title="listitems"
                                icon={TabIcon}
                            >
                                <Scene key="listitems"
                                    component={ListItems}
                                    title="My Documents"
                                    icon={TabIcon}
                                    tabBarLabel="My Documents"
                                >
                                </Scene>
                            </Scene>
                            <Scene key="myprofile"
                                title="myprofile"
                                icon={TabIcon}
                                titleStyle={{ color: 'white' }}
                            >
                                <Scene key="myprofile"
                                    component={MyProfile}
                                    title="My Profile"
                                    icon={TabIcon}
                                    tabBarLabel="My Profile"
                                    titleStyle={{ color: 'white' }}
                                />
                            </Scene>
                        </Scene>

                        <Scene key="itemdetail"
                            component={ItemDetail}
                            title=""
                        />
                        <Scene key="productdetail"
                            component={ProductDetail}
                            title="Info"
                        />
                        <Scene key="history"
                            component={History}
                            title="History"
                        />

                        <Scene key="publishsell"
                            component={PublishSell}
                            title="Generate Code"
                        />
                        <Scene key="paymentproduct"
                            component={PaymentProduct}
                            title="Payment"
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
                        <Scene key="findproduct"
                            component={FindProduct}
                            direction="vertical"
                            title="All Products"
                        />
                        <Scene key="listproduct"
                            component={ListProducts}
                            title=""
                        />
                        <Scene key="circlecode"
                            component={CircleCode}
                            title=""
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
