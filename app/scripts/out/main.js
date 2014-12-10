"use strict";

var TemplateGetter = require('/scripts/out/templategetter')["default"];
var FirebaseData = require('/scripts/out/firebase')["default"];


var templateGetter = new TemplateGetter();
var firebase = new FirebaseData();

var mainView = document.querySelector("[data-main-view]");


console.log(window.location);

if (window.location.pathname === "/") {
  var SearchBox;
  var BookHolder;
  var Ajax;
  (function () {
    SearchBox = require('/scripts/out/searchbox')["default"];
    BookHolder = require('/scripts/out/bookholder')["default"];
    Ajax = require('/scripts/out/ajax')["default"];



    templateGetter.get("/templates/main.html", function () {
      execute();
    });

    var execute = function () {
      var ajax = new Ajax();
      var bookholder = new BookHolder();

      var searchbox = new SearchBox();
      searchbox.setCallback(function (query) {
        if (query === "") {
          return;
        }


        ajax.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&maxResults=40", function (d) {
          bookholder.appendList(JSON.parse(d));
          searchbox.hideSearchBar();
        });
      });
    };
  })();
}