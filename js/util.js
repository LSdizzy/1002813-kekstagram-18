'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;
  var MAX_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var SCALE_STEP = 25;

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === window.ESC_KEYCODE;
    },
    isEnterEvent: function (evt, action) {
      return evt.keyCode === window.ENTER_KEYCODE;
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
    decreaseScale: function(valueInput, pictureElement) {
      var value = parseInt(valueInput.value);
      var newValue = value - SCALE_STEP;

      if (newValue >= MIN_SCALE_VALUE) {
        valueInput.value = newValue + '%';
        pictureElement.style.transform = `scale(${newValue / 100})`;
      }
    },
    increaseScale: function(valueInput, pictureElement) {
      var value = parseInt(valueInput.value);
      var newValue = value + SCALE_STEP;

      if (newValue <= MAX_SCALE_VALUE) {
        valueInput.value = newValue + '%';
        pictureElement.style.transform = `scale(${newValue / 100})`;
      }
    }
  };
})();
