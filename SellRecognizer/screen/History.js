import React from 'react';
import { StyleSheet, Text, View, ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import StoreLocalService from "../service/StoreLocalService";
import Item from "./part/Item";
import FindDocumentButton from "./part/FindDocumentButton";
import HistoryItem from "./part/HistoryItem";
import _ from "underscore";

export default class History extends React.Component {
    constructor(props) {
        super(props)
        var histories = this.props.item.section.history;


        _.each(histories, function (item, index) {
            if (index == 0) {
                item.index = 0;
            }
            else {
                item.index = -1;
            }
        });

        if (this.props.item.buyerCode != "") {
            var buyer = this.props.item.buyer;
            buyer.index = 1;
            histories.push(this.props.item.buyer);
        }
        histories = histories.reverse();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(histories),
            user: {}
        };
    }
    componentDidMount() {
        var self = this;
        StoreLocalService.getUser().then(function (user) {
            self.setState({ user: user });
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
                            renderRow={(user) =>
                                <HistoryItem user={user} style={{ height: 130 }}></HistoryItem>
                            }
                        />
                    </Row>

                </Grid>
                {/* <FindDocumentButton style={styles.findbutton} /> */}
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    findbutton: {
        position: 'absolute',
        width: "100%",
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
    }
});