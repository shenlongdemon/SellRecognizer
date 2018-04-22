import React from 'react';
import WebApi from 'react-native-web-api';
import config from '../config.json';
import _ from "underscore";
import { AsyncStorage } from 'react-native';

export default class StoreLocalService extends React.Component {
    static setPhone(phone) {
        return AsyncStorage.setItem("phone",phone);
    }
    static getPhone() {
        return AsyncStorage.getItem("phone");
    }
    static setUser(user){
        return AsyncStorage.setItem("user",JSON.stringify(user));
    }
    static async getUser(){
        var userStr = await AsyncStorage.getItem("user");
        return JSON.parse(userStr);
    }
   
    static clearAll(){
        AsyncStorage.clear();
    }
   
}