'use strict';

(function () {
  var listPicture = document.querySelector('.pictures');
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var PICTURES_NUM = 25;

  window.picture = {
    createPicture: function (picture) {
      var pictureTemplate = document.querySelector('#picture').content;
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
      pictureElement.querySelector('.picture__likes').textContent = picture.likes;
      pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
      pictureElement.querySelector('.picture').setAttribute('tabindex', '0');

      return pictureElement;
    },
    // функция помешения на страницу дом-элементо
    renderPictures: function (arr) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < PICTURES_NUM; i++) {
        fragment.appendChild(window.picture.createPicture(arr[i]));
      }
      listPicture.appendChild(fragment);
      window.photoCollection = document.querySelectorAll('.picture');
    }
  };


})();
