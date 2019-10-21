'use strict';

(function () {

  var MAX_HASH_TAGS = 5;
  var MAX_HASH_TAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;

  window.validation = {

    findSameHashtags: function (array, item) {
      var hashtags = [];
      var wordIdx = array.indexOf(item);
      while (wordIdx !== -1) {
        hashtags.push(wordIdx);
        wordIdx = array.indexOf(item, wordIdx + 1);
      }

      if (hashtags.length > 1) {
        return true;
      }
      return false;
    },


    validateHahtags: function (input) {
      var hashtagsArray = input.value.toLowerCase().split(' ');
      var currentElement;
      for (var i = 0; i < hashtagsArray.length; i++) {
        currentElement = hashtagsArray[i];
        if (hashtagsArray.indexOf(' ') !== -1) {
          input.setCustomValidity('хэш-теги разделяются пробелами');
        } else if (currentElement.charAt(0) !== '#') {
          input.setCustomValidity('хештег должен начинаться с символа #');
        } else if (window.validation.findSameHashtags(hashtagsArray, currentElement)) {
          input.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        } else if (currentElement.length <= 1) {
          input.setCustomValidity('хештег не должен состоять только из символа #');
        } else if (currentElement.length > MAX_HASH_TAG_LENGTH) {
          input.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (hashtagsArray.length > MAX_HASH_TAGS) {
          input.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        } else {
          input.setCustomValidity('');
        }
      }
    },

    validateComment: function (input) {
      if (input.value.length > MAX_COMMENT_LENGTH) {
        input.setCustomValidity('длина комментария не может составлять больше 140 символов');
      } else {
        input.setCustomValidity('');
      }
    }

  };
})();
