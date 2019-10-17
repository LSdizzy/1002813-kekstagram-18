'use strict'

window.util = (function() {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  var hashtagsInput = document.querySelector('.text__hashtags');//поле ввода хештегов
  var commentInput = document.querySelector('.text__description');//поле ввода коментариев

  return {
    isEscEvent: function(evt, action) {
      if (evt.keyCode === ESC_KEYCODE && hashtagsInput !== evt.target && commentInput !== evt.target) {
        window.gallery.closePreview();
      }
    },
    isEnterEvent: function(evt,action) {
      if (evt.kayCode === ENTER_KEYCODE) {
        window.gallery.closePreview();
      }
    },
    randomInteger: function(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand)
      return rand;
    },
    findRandomValue: function(num) {
      return Math.floor(Math.random() * num);
    },
    findCurrentIndex: function(collection, target) {
      var index = Array.prototype.slice.call(collection).indexOf(target);
      return index;
    }
  };
})();
