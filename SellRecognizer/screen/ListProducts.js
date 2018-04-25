import React from 'react';
import { StyleSheet, View, ListView, Image, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button, Text, Icon } from 'react-native-elements'

import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import StoreLocalService from "../service/StoreLocalService";
import Product from "./part/Product";
import FindDocumentButton from "./part/FindDocumentButton";


export default class ListProducts extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            user: {},
            pageNum: 1
        };
    }
    componentWillReceiveProps(nextProps) {
        Actions.refresh({ title: nextProps.category.value})
    }
    componentDidMount() {
        var self = this;
        StoreLocalService.getUser().then(function (user) {
            self.setState({ user: user });
            self.loadProductsByCategory();
        });


    }
    componentWillMount() {
        Actions.refresh({ right: this.renderRefreshButton });
    }
    renderRefreshButton = () => {
        return (
            <TouchableOpacity onPress={() => this.refresh()} >
                <Icon name="sync"  size={25} color='white' />
            </TouchableOpacity>
        );
    };
    
    refresh = () => {
        self.setState({ pageNum: 1 });
        this.loadProductsByCategory();
    }
    loadProductsByCategory() {
        var self = this;
        CommonService.getProductsByCategory(this.props.category.id, this.state.pageNum)
            .then(function (res) {
                if (res.Status == 1) {
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    self.setState({ dataSource: ds.cloneWithRows(res.Data) });
                    self.setState({ pageNum: self.state.pageNum + 1 });
                }
            });
    }
    render() {
        return (
            <CommonPage style={styles.container}>
                <Grid >
                    <Row >
                        <ListView
                            style={{ backgroundColor: "#e6e6e6" }}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            renderRow={(item) =>
                                <Product item={item} style={{ height: 130 }}></Product>
                            }
                        />
                    </Row>

                </Grid>                
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        position: 'absolute',

        bottom: 5,
        right: 10,
    }
});