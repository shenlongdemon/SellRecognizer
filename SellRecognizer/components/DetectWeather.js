import React from 'react';
import WebApi from 'react-native-web-api';
import config from '../config.json';
import _ from "underscore";
export default class DetectWeather extends React.Component {
    static getWeather(lat, lon) {
        console.log("DetectWeather getWeather " + lat + "," + lon);
        var url = config.weather.url.replace("{lat}",lat);
        url = url.replace("{lon}",lon);
        url = url.replace("{APIKey}",config.weather.APIKey);
        return WebApi.request("GET", url, null, null);
    }
}