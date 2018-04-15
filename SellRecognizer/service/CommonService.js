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
    static insertItem(item) {
        console.log("CommonService insertItem " + JSON.stringify(item));
        var url = config.service.url + "/api/sellrecognizer/insertItem";
        return WebApi.request("POST", url, item, null);
    }
    static getItemByOwnerId(ownerId) {
        console.log("CommonService getItemByOwnerId " + ownerId);
        var phone = ownerId.replace("+", "%2B");
        var url = config.service.url + "/api/sellrecognizer/getItemsByOwnerId?ownerId=" + phone + "&pageNum=1&pageSize=10000";
        return WebApi.request("GET", url, null, null);
    }
    static getItems() {
        console.log("CommonService getItems");
        var url = config.service.url + "/api/sellrecognizer/getItems?pageNum=1&pageSize=10000";
        return WebApi.request("GET", url, null, null);
    }
    
    static login(phone, password) {
        console.log("CommonService login " + phone + " " + password);
        var num = phone.replace("+", "%2B");
        var url = config.service.url + "/api/sellrecognizer/login?phone=" + num + "&password=" + password;
        return WebApi.request("GET", url, null, null);
    }
    static payment(itemId, buyerInfo){
        console.log("CommonService payment " + itemId + " " + JSON.stringify(buyerInfo));

        var data = {itemId: itemId, buyerInfo: buyerInfo};
        var url = config.service.url + "/api/sellrecognizer/payment";
        return WebApi.request("POST", url, data, null);
    }
}