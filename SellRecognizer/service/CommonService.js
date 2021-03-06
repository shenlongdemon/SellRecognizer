import React from 'react';
import WebApi from 'react-native-web-api';
import config from '../config.json';
import _ from "underscore";
import StoreLocalService from "./StoreLocalService";
import DetectService from "../components/DetectService";
import lzjs from 'lzjs';
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
    static getItemsByOwnerId(ownerId) {
        console.log("CommonService getItemsByOwnerId " + ownerId);
        var url = config.service.url + "/api/sellrecognizer/getItemsByOwnerId?ownerId=" + ownerId + "&pageNum=1&pageSize=10000";
        return WebApi.request("GET", url, null, null);
    }
    static getProductsByCategory(categoryId, pageNum) {
        console.log("CommonService getProductsByCategory " + categoryId);
        var url = config.service.url + "/api/sellrecognizer/getProductsByCategory?categoryId=" + categoryId + "&pageNum=" + pageNum + "&pageSize=10000";
        return WebApi.request("GET", url, null, null);
    }
    static getItems() {
        console.log("CommonService getItems");
        var url = config.service.url + "/api/sellrecognizer/getItems?pageNum=1&pageSize=10000";
        return WebApi.request("GET", url, null, null);
    }



    static login(phone, password) {

        var num = phone.replace("+", "%2B");
        var url = config.service.url + "/api/sellrecognizer/login?phone=" + num + "&password=" + password;
        console.log("CommonService login " + url + phone + " " + password);
        return WebApi.request("GET", url, null, null);
    }
    static payment(itemId, buyerInfo) {
        console.log("CommonService payment " + itemId + " " + JSON.stringify(buyerInfo));

        var data = { itemId: itemId, buyerInfo: buyerInfo };
        var url = config.service.url + "/api/sellrecognizer/payment";
        return WebApi.request("POST", url, data, null);
    }
    static publishSell(itemId, userInfo) {
        console.log("CommonService publishSell " + itemId);
        var data = { itemId: itemId, userInfo: userInfo };
        var url = config.service.url + "/api/sellrecognizer/publishSell";
        return WebApi.request("POST", url, data, null);
    }
    static getSelledItems(pageNum) {
        console.log("CommonService getSelledItems pageNum " + pageNum);
        var url = config.service.url + "/api/sellrecognizer/getSelledItems?pageNum=" + pageNum + "&pageSize=20";
        return WebApi.request("GET", url, null, null);
    }
    static getUserInfo() {
        return new Promise(
            function (resolve, reject) {
                StoreLocalService.getUser().then((user) => {
                    DetectService.getDeviceInfo().then((data) => {

                        user.position = data.position;
                        user.weather = data.weather;
                        user.time = CommonService.getLongDate();
                        resolve(user);
                    }).catch((e) => {
                        reject(e);
                    });
                });
            });
    }
    static getLongDate() {
        var d = new Date();
        var n = d.getTime();
        return n;
    }
    static getItemByQRCode(qrcode) {
        console.log("CommonService getItemByQRCode qrcode " + qrcode);
        var url = config.service.url + "/api/sellrecognizer/getItemByQRCode?qrcode=" + qrcode;
        return WebApi.request("GET", url, null, null);
    }
    static updateProfile(id, user) {
        console.log("CommonService updateProfile " + id + " " + JSON.stringify(user));
        var data = { id: id, user: user };
        var url = config.service.url + "/api/sellrecognizer/updateUser";
        return WebApi.request("POST", url, data, null);
    }
    static getProductsByCodes(names) {
        console.log("CommonService getItemsByCodes " + names.length);
        var url = config.service.url + "/api/sellrecognizer/getProductsByCodes";
        return WebApi.request("POST", url, names, null);
    }
    static getProductsByBluetoothCodes(names) {
        console.log("CommonService getItemsByCodes " + names.length);
        var url = config.service.url + "/api/sellrecognizer/getProductsByBluetoothCodes";
        return WebApi.request("POST", url, names, null);
    }



    static confirmReceiveItem(id) {
        console.log("CommonService confirmReceiveItem " + id);
        var url = config.service.url + "/api/sellrecognizer/confirmReceiveItem?id=" + id;
        return WebApi.request("GET", url, null, null);
    }
    static compress(str) {
        var c = lzjs.compress(str);
        console.log("compress " + str.length + " --> " + c);
        return c;
    }
    static decompress(str) {
        var c = lzjs.decompress(str);
        console.log("decompress " + str.length + " --> " + c);
        return c;
    }
    static cancelSell(itemId) {
        console.log("CommonService cancelSell " + itemId);
        var url = config.service.url + "/api/sellrecognizer/cancelSell?id=" + itemId;
        return WebApi.request("GET", url, null, null);
    }
    static getDescriptionQRCode(qrCode) {
        
        console.log("CommonService getDescriptionQRCode " + qrCode);
        
        var data = {code : qrCode};
        var url = config.service.url + "/api/sellrecognizer/getDescriptionQRCode";
        WebApi.request("POST", url, data, null).then((res) => {
            alert(res.Data);
        });
    }
}