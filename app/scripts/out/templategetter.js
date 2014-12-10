"use strict";

var AJAX = require('/ajax')["default"];
var TemplateGetter = (function () {
  var TemplateGetter = function TemplateGetter() {
    this.ajax = new AJAX("document");
    this.fragment = document.createDocumentFragment();
    this.mainView = document.querySelector("[data-main-view]");
  };

  TemplateGetter.prototype.get = function (templateUrl, cb) {
    var _this = this;
    this.ajax.get(templateUrl, function (html) {
      var nodes = html.querySelector("body").childNodes;
      for (var i in nodes) {
        if (typeof nodes[i] === "object") {
          _this.fragment.appendChild(nodes[i]);
        }
      }

      _this.mainView.appendChild(_this.fragment);
      cb();
    });
  };

  return TemplateGetter;
})();

exports["default"] = TemplateGetter;