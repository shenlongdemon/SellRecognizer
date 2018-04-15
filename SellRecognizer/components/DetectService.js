import React from 'react';
import WebApi from 'react-native-web-api';
import config from '../config.json';
import _ from "underscore";
export default class DetectService extends React.Component {
    static getWeather(lat, lon) {
        console.log("DetectService getWeather " + lat + "," + lon);
        var url = config.weather.url.replace("{lat}", lat);
        url = url.replace("{lon}", lon);
        url = url.replace("{APIKey}", config.weather.APIKey);
        return WebApi.request("GET", url, null, null);
    }
    static getCurrentPosition() {
        return new Promise(
            function (resolve, reject) { // (A)
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log("DetectService getCurrentPosition " + JSON.stringify(position));
                        resolve(position);
                    },
                    (error) => reject(error),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },

                );
            });
    }
    static getDeviceInfo() {
        return new Promise(
            function (resolve, reject) { // (A)
                DetectService.getCurrentPosition().then((position) => {
                    DetectService.getWeather(position.coords.latitude, position.coords.longitude)
                        .then(function (weather) {
                            resolve({
                                position: position,
                                weather: weather
                            });
                        }).catch((e) => {
                            reject(e)
                        });
                }).catch((e) => {
                    reject(e)
                });
            });
    }

    static getDeviceInfo1(self) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("DetectService getCurrentPosition " + JSON.stringify(position));
                self.setState({ position: position });
                DetectService.getWeather(position.coords.latitude, position.coords.longitude)
                    .then(function (data) {
                        console.log("DetectService getWeather " + JSON.stringify(data));
                        self.setState({ weather: data });
                    });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },

        );
    }


}