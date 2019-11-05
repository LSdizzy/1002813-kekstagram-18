'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === window.ENTER_KEYCODE;
    },
    isEnterEvent: function (evt, action) {
      return evt.keyCode === window.ESC_KEYCODE;
    },
    findRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },
    findRandomValue: function (num) {
      return Math.floor(Math.random() * num);
    },
    findCurrentIndex: function (collection, target) {
      var index = Array.prototype.slice.call(collection).indexOf(target);
      return index;
    },
    compareRandom: function (a, b) {
      return Math.random() - 0.5;
    }
  };
})();
