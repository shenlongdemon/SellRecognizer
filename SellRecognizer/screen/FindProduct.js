import React from 'react';
import { StyleSheet, View, ListView, Image,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import Item from "./part/Item";
import { FormLabel, FormValidationMessage, FormInput, Button, Text, Icon } from 'react-native-elements'
import StoreLocalService from "../service/StoreLocalService";

export default class FindProduct extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }
    componentDidMount() {
        var self = this;
        StoreLocalService.getUser().then(function (user) {
            self.setState({ user: user });
            self.loadItems();
        });
        this.loadCategories();

    }
    loadCategories() {
        var self = this;
        CommonService.getCategories()
            .then(function (res) {
                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                self.setState({ dataSource: ds.cloneWithRows(res.Data) });
            });
    }
    render() {
        return (
            <CommonPage style={styles.container}>
                <Grid>
                    <Row style={{
                        height: 70, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{  flex: 1, fontSize: 20, fontWeight: 'bold' }}>Find by Category</Text>
                    </Row>
                    <Row>
                        <ListView
                            style={{ backgroundColor: "#e6e6e6" }}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            renderRow={(category) =>
                                <TouchableOpacity activeOpacity={.5} onPress={() => Actions.listproduct({ category: category })}>

                                <Grid style={{ height: 50 }}>
                                    <Row style={{ backgroundColor: '#F2F2F2' }}>
                                        <Col style={{
                                            height: 50, width: 50,
                                            justifyContent: 'center',
                                        }}>
                                            <Icon name={category.icon} size={25} color='gray' />
                                        </Col>
                                        <Col style={{
                                            justifyContent: 'center',
                                        }}>
                                            <Text>{category.value}</Text>
                                        </Col>
                                        <Col style={{
                                            height: 50, width: 50,
                                            justifyContent: 'center',
                                        }}>
                                            <Icon type='ionicon' name='ios-arrow-forward' size={25} color='gray' />
                                        </Col>
                                    </Row>
                                    <Row style={{ height: 3 }}>

                                    </Row>
                                </Grid>
                                </TouchableOpacity>
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
});