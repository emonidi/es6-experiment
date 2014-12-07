"use strict";

var Ajax = (function () {
  var Ajax = function Ajax() {
    this.xhr = new XMLHttpRequest();
  };

  Ajax.prototype.send = function () {
    this.xhr.send();
  };

  Ajax.prototype.get = function (url, success, error) {
    this.xhr.open("GET", url, true);
    this.send();
    this.processResponse(success, error);
  };

  Ajax.prototype.processResponse = function (success, error) {
    this.xhr.onreadystatechange = function (e) {
      if (this.readyState === 4 && this.status === 200) {
        success(JSON.parse(this.response));
      } else if (this.readyState === 4 && this.status !== 200) {
        error && error(JSON.parse(this.response));
      }
    };
  };

  return Ajax;
})();

exports["default"] = Ajax;