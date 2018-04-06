import React from 'react';
import WebApi from 'react-native-web-api';
import config from '../config.json';
import _ from "underscore";
export default class SearchImage extends React.Component {
  static getImages(keyword) {
    console.log("SearchImage getImages " + keyword);
    var url = config.service.url + "/api/sellrecognizer/searchImage?obj=" + keyword;
    return WebApi.request("GET",url, null,null);
  }
}