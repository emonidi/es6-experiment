"use strict";

var SearchBox = (function () {
  var SearchBox = function SearchBox() {
    var _this = this;
    this.searchIcon = document.querySelector(".search a");
    this.el = document.querySelector("search-box");
    this.searchBar = document.querySelector(".searchbar");
    this.form = this.el.querySelector("form");
    this.input = this.el.querySelector("input");
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      _this.callback(_this.input.value);
    });

    this.setSearchIcon();
  };

  SearchBox.prototype.setCallback = function (callback) {
    this.callback = callback;
  };

  SearchBox.prototype.setSearchIcon = function () {
    var _this2 = this;
    console.log(this.searchBar);
    this.searchIcon.addEventListener("click", function (e) {
      e.preventDefault();
      _this2.toggleSearchBar();
    });

    document.addEventListener("scroll", function () {
      if (_this2.searchBarIsCollapsed()) {
        _this2.hideSearchBar();
      }
    });
  };

  SearchBox.prototype.toggleSearchBar = function (hidden) {
    var classAttribute = this.searchBar.getAttribute("class");
    if (!this.searchBarIsCollapsed()) {
      this.searchBar.setAttribute("class", classAttribute + " collapsed");
    } else {
      this.searchBar.setAttribute("class", classAttribute.replace("collapsed", ""));
    }
  };

  SearchBox.prototype.searchBarIsCollapsed = function () {
    var searchbar = this.searchBar;
    var classAttribute = searchbar.getAttribute("class");
    return classAttribute.search("collapsed") === -1 ? false : true;
  };

  SearchBox.prototype.hideSearchBar = function () {
    this.searchBar.setAttribute("class", this.searchBar.getAttribute("class").replace("collapsed", ""));
  };

  return SearchBox;
})();

exports["default"] = SearchBox;