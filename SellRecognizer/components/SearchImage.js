import React from 'react';
import WebApi from 'react-native-web-api';
import config from '../config.json';
import _ from "underscore";
export default class SearchImage extends React.Component {
  static getImages(keyword, complete) {

    //"url":"?q={keyword}&num={pageSize}&start={offset}&imgSize=medium&searchType=image&key={APIKey}&cx={searchEngineKey}",
    
      var url = config.google.imageSearch.url;
      url = url.replace("{keyword}", keyword);
      url = url.replace("{pageSize}", 10);
      url = url.replace("{offset}", 1);
      url = url.replace("{APIKey}", config.google.APIKey);
      url = url.replace("{searchEngineKey}", config.google.imageSearch.searchEngineKey);
      console.log("BEGIN getImages " + url);
      WebApi.request("GET",url,null,null).then(function(json){
        console.log("DOING getImages" + JSON.stringify(json));

        var items = _.map(json.items, function(item){ 
            return {link:item.link, title: item.title};
        });
        console.log("END getImages " + items.length);
        complete(json);
      });

  }
}