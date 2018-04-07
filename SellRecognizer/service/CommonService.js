import React from 'react';
import WebApi from 'react-native-web-api';
import config from '../config.json';
import _ from "underscore";
export default class CommonService extends React.Component {
    static getCategories() {
        console.log("CommonService getCategories");
        var url = config.service.url + "/api/sellrecognizer/getCategories";
        return WebApi.request("GET", url, null, null);
    }
    static insertItem(item){
        console.log("CommonService insertItem " + JSON.stringify(item));
        var url = config.service.url + "/api/sellrecognizer/insertItem";
        return WebApi.request("POST", url, item, null);
    }
}