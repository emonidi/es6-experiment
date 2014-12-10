"use strict";

var LazyImageLoader = require('/lazyimageloader')["default"];
var FirebaseData = require('/firebase')["default"];
var firebase = new FirebaseData();

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
    var _this = this;
    this.clearBooks();
    firebase.getLikedBooks(function (likedBooks) {
      console.log(likedBooks);
      for (var _iterator = items.items[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var item = _step.value;


        var info = item.volumeInfo;
        if (info.industryIdentifiers && info.industryIdentifiers[0]) {
          var isbn = info.industryIdentifiers[0].identifier;
          info.liked = likedBooks.indexOf(isbn) > -1 ? isbn : false;
        }
        var htmlString = _this.listItemTemplate(info);

        _this.fragment.appendChild(htmlString);
      }

      _this.el.appendChild(_this.fragment);
    });
  };

  BookHolder.prototype.setLikeFunctionality = function (elem) {
    var self = this;
    var href = elem.querySelector(".like a");
    var isbn = href.getAttribute("data-book-isbn");
    href.addEventListener("click", function (e) {
      var _href = document.querySelector("[data-book-isbn = \"" + isbn + "\"]");
      var liked = _href.getAttribute("data-book-liked");
      var bookData = {
        isbn: _href.getAttribute("data-book-isbn"),
        title: _href.getAttribute("data-book-title")
      };
      e.preventDefault();
      if (liked !== "false") {
        firebase.remove(bookData, function (response) {
          self.setDisliked(elem);
        });
      } else {
        firebase.save(bookData, function (response) {
          if (response.isbn || response.title) {
            self.setLiked(elem, response.isbn);
          }
        });
      }
    });
  };

  BookHolder.prototype.setLiked = function (elem, liked) {
    console.log(elem);
    var heartIcon = elem.querySelector(".glyphicon");
    var classString = heartIcon.getAttribute("class");
    heartIcon.setAttribute("class", classString.replace("glyphicon-heart-empty", "glyphicon-heart"));

    heartIcon.parentNode.setAttribute("data-book-liked", liked);
  };

  BookHolder.prototype.setDisliked = function (elem) {
    var heartIcon = elem.querySelector(".glyphicon");
    var classString = heartIcon.getAttribute("class");
    heartIcon.setAttribute("class", classString.replace("glyphicon-heart", "glyphicon-heart-empty"));
    heartIcon.parentNode.setAttribute("data-book-liked", "false");
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
    var bookData = {
      isbn: item.industryIdentifiers ? item.industryIdentifiers[0].identifier : undefined,
      title: item.title,
      liked: item.liked
    };
    var likeIconClass = item.liked ? "glyphicon-heart" : "glyphicon-heart-empty";
    if (item.imageLinks && item.imageLinks.thumbnail) {
      image = "<div class=\"thumb\">" + "<img class=\"book-image\" data-src=\"" + item.imageLinks.thumbnail.replace("zoom=1", "zoom=2") + "\"  src=\"../images/book-icon.png\"/>" + "<div class=\"caption\">" + "<span>" + title + "</span>" + "<span class=\"text-right like\">" + "<a href=\"#\" data-book-isbn=\"" + bookData.isbn + "\" data-book-title=\"" + bookData.title + "\" data-book-liked=\"" + bookData.liked + "\">" + "<i class=\"glyphicon " + likeIconClass + "\"></i>" + "</a>" + "</span>" + "</div>" + "</div>";
    } else {
      image = "<div class=\"thumb\">" + "<img class=\"book-image\" src=\"../images/book-icon.png\" class=\"book-icon\"/>" + "<div class=\"caption\">" + "<span>" + title + "</span>" + "<span class=\"text-right like\">" + "<a href=\"#\" data-book-isbn=\"" + bookData.isbn + "\" data-book-title=\"" + bookData.title + "\" data-book-liked=\"" + bookData.liked + "\">" + "<i class=\"glyphicon " + likeIconClass + "\"></i>" + "</a>" + "</span>" + "</div>" + "</div>";
    }



    div.innerHTML = image;
    this.loader.loadImages(div);
    this.setLikeFunctionality(div);
    return div;
  };

  return BookHolder;
})();

exports["default"] = BookHolder;