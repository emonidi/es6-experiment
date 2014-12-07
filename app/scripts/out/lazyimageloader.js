"use strict";

var LazyImageLoader = (function () {
  var LazyImageLoader = function LazyImageLoader() {};

  LazyImageLoader.prototype.loadImages = function (holder) {
    var image = holder.querySelectorAll("img")[0];

    var dataSource = image.getAttribute("data-src");

    if (!dataSource) {
      return;
    }
    var img = new Image();
    img.src = dataSource;
    img.onload = function (e) {
      image.src = img.src;
    };
  };

  return LazyImageLoader;
})();

exports["default"] = LazyImageLoader;