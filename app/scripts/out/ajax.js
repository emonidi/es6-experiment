"use strict";

var Ajax = (function () {
  var Ajax = function Ajax(responseType) {
    this.xhr = new XMLHttpRequest();
    this.xhr.responseType = responseType ? responseType : "text";
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
    var self = this;
    this.xhr.onreadystatechange = function (e) {
      if (self.responseType === "text") {
        this.response = JSON.parse(this.response);
      }
      console.log(self.xhr.responseType);
      if (this.readyState === 4 && this.status === 200) {
        success(this.response);
      } else if (this.readyState === 4 && this.status !== 200) {
        error && error(this.response);
      }
    };
  };

  return Ajax;
})();

exports["default"] = Ajax;