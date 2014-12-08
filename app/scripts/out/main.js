"use strict";

var Ajax = require('/scripts/out/ajax')["default"];
var SearchBox = require('/scripts/out/searchbox')["default"];
var BookHolder = require('/scripts/out/bookholder')["default"];
var FirebaseData = require('/scripts/out/firebase')["default"];


var bookholder = new BookHolder();
var firebase = new FirebaseData();

var searchbox = new SearchBox();
searchbox.setCallback(function (query) {
  if (query === "") {
    return;
  }

  var ajax = new Ajax();
  ajax.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&maxResults=40", function (d) {
    bookholder.appendList(d);
    searchbox.hideSearchBar();
  });
});