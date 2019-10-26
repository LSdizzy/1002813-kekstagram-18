'use strict';

(function () {

  var listPicture = document.querySelector('.pictures');
  var uploadPhotoOverlay = listPicture.querySelector('.img-upload__overlay');
  var photoFiltersSlider = listPicture.querySelector('.img-upload__effect-level');// слайдер изменения глубины эффекта

  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var openBigPicture = document.querySelector('.picture__img');

  var uploadFileInput = listPicture.querySelector('.img-upload__input');// поле загрузки фильтров
  var closePhotoPreview = listPicture.querySelector('.img-upload__cancel');// зачек крестика

  var onPreviewEscPress = function (evt) {
    window.util.isEscEvent(evt, closePreview);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPreview = function () {
    uploadPhotoOverlay.classList.remove('hidden');
    listPicture.querySelector('#effect-none').checked = true;// значение по умолчанию
    photoFiltersSlider.classList.add('hidden');// без слайдера на оригинале
    document.addEventListener('keydown', onPreviewEscPress);// закрытие окна на esc
  };

  var closePreview = function () {
    uploadPhotoOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  var openPopup = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  closeBigPicture.addEventListener('click', function () {
    closePopup();
  });

  closeBigPicture.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopup);
  });

  uploadFileInput.addEventListener('change', function () {
    openPreview();
  });

  closePhotoPreview.addEventListener('click', function () {
    closePreview();
  });

  closePhotoPreview.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePreview);
  });

  // Пустой массив для хранения фотографий пользователей
  var photos = [];
  window.xhr.load(window.picture.renderPictures, window.xhr.error);


  // Показ оверлея с текущей выбранной картинки при клике
  listPicture.addEventListener('click', function (evt) {
    var target = evt.target;
    var currentElement;

    if (target.parentNode.classList.contains('picture')) {
      openPopup();
      currentElement = window.util.findCurrentIndex(window.photoCollection, target.parentNode);
      window.preview.pasteBigPicture(window.data[currentElement]);
    }
  });

  // Показ оверлея с текущей выбранной картинки при нажатии клавиши
  listPicture.addEventListener('keydown', function (evt) {
    var target = evt.target;
    var currentElement;

    if (evt.keyCode === window.ENTER_KEYCODE && target.classList.contains('picture')) {
      openPopup();
      currentElement = window.util.findCurrentIndex(window.photoCollection, target.parentNode);
      window.preview.pasteBigPicture(window.data[currentElement]);
    }
  });
})();
