"use strict";

var LazyImageLoader = require('/lazyimageloader')["default"];
var BookHolder = (function () {
  var BookHolder = function BookHolder() {
    this.el = document.querySelector("#book-holder");
    this.ul = document.createElement("ul");
    this.ul.setAttribute("class", "list-group");
    this.fragment = document.createDocumentFragment();
    this.parser = new DOMParser();
    this.loader = new LazyImageLoader();
  };

  BookHolder.prototype.appendList = function (items) {
    this.clearBooks();

    for (var _iterator = items.items[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      var item = _step.value;
      var info = item.volumeInfo;
      var htmlString = this.listItemTemplate(info);

      this.fragment.appendChild(htmlString);
    }

    this.el.appendChild(this.fragment);



  };

  BookHolder.prototype.clearBooks = function () {
    this.ul.innerHTML = "";
    this.el.innerHTML = "";
    this.fragment.innerHTML = "";
  };

  BookHolder.prototype.listItemTemplate = function (item) {
    var image = "";
    var div = document.createElement("div");
    div.setAttribute("class", "col-md-3 col-sm-6 col-xs-12 text-center");
    var title = item.title ? item.title.substr(0, 30) : "unknown";
    if (item.imageLinks && item.imageLinks.thumbnail) {
      var str = ";lkasd;lkas;ldkas?zoom=1&a;lskda;lskdals";
      console.log(str.replace("zoom=1", "zoom=2"));
      item.imageLinks.thumbnail.replace("zoom=1", "zoom=2");
      console.log(item.imageLinks.thumbnail);
      image = "<div class=\"thumb\">" + "<img data-src=\"" + item.imageLinks.thumbnail.replace("zoom=1", "zoom=2") + "\"  src=\"../images/book-icon.png\"/>" + "<div class=\"caption\">" + title + "</div>" + "</div>";
    } else {
      image = "<div class=\"thumb\">" + "<img src=\"../images/book-icon.png\" class=\"book-icon\"/>" + "<div class=\"caption\">" + title + "</div>" + "</div>";
    }



    div.innerHTML = image;
    this.loader.loadImages(div);
    console.log(div);
    return div;
  };

  return BookHolder;
})();

exports["default"] = BookHolder;