import React from 'react';
import { StyleSheet, Text, View, ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Col, Row, Grid } from "react-native-easy-grid";
import CommonService from "../service/CommonService";
import CommonPage from "./CommonPage"
import StoreLocalService from "../service/StoreLocalService";
import Item from "./part/Item";
import FindDocumentButton from "./part/FindDocumentButton";


export default class LookAround extends React.Component {
    constructor(props) {
        super(props)
       
    }
    componentDidMount() {
      
        

    }
   
    render() {
        return (
            <CommonPage style={styles.container}>
              <FindDocumentButton style={styles.findbutton} />
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