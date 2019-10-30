'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  var hashtagsInput = document.querySelector('.text__hashtags');// поле ввода хештегов
  var commentInput = document.querySelector('.text__description');// поле ввода коментариев

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.ESC_KEYCODE && hashtagsInput !== evt.target && commentInput !== evt.target) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.kayCode === window.ENTER_KEYCODE) {
        action();
      }
    },
    randomInteger: function (min, max) {
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
    }
  };
})();
