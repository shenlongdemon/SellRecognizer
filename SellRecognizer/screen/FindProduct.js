import React from 'react';
import { StyleSheet, Text, View, ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import Item from "./part/Item";

export default class FindProduct extends React.Component {
    constructor(props) {
        super(props)
       
    }
    componentDidMount() {      

    }
    render() {
        return (
            <CommonPage style={styles.container}>
               
            </CommonPage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1        
    },
});