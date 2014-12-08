"use strict";

var FirebaseData = (function () {
  var FirebaseData = function FirebaseData() {
    this.db = new Firebase("https://my-google-book.firebaseio.com/books");
    console.log(this.db);
  };

  FirebaseData.prototype.save = function (data, cb) {
    this.db.push(data).once("value", function (snapshot) {
      cb(snapshot.val());
    });
  };

  FirebaseData.prototype.remove = function (data, cb) {
    console.log(data);
    var self = this;
    //let item = this.db.child('isbn/'+data.isbn);
    this.db.once("value", function (snapshot) {
      snapshot.forEach(function (e) {
        if (e.val().isbn === data.isbn) {
          self.db.child(e.key()).remove(function (err) {
            if (!err) {
              cb();
            }
          });
        }
      });
    });
  };

  FirebaseData.prototype.getAllBooks = function (callback) {
    this.db.once("value", function (snapshot) {
      callback(snapshot.val());
    });
  };

  FirebaseData.prototype.getLikedBooks = function (callback) {
    var arr = [];
    this.getAllBooks(function (data) {
      for (var i in data) {
        data[i].isbn !== undefined && arr.push(data[i].isbn);
      }
      callback(arr);
    });
  };

  return FirebaseData;
})();

exports["default"] = FirebaseData;