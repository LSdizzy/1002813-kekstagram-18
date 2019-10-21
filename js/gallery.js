'use strict';

(function () {

  var listPicture = document.querySelector('.pictures');
  var uploadFotoOverlay = listPicture.querySelector('.img-upload__overlay');
  var fotoFiltersSlider = listPicture.querySelector('.img-upload__effect-level');// слайдер изменения глубины эффекта
  // var uploadImages = document.querySelector('.img-upload');

  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');

  var uploadFileInput = listPicture.querySelector('.img-upload__input');// поле загрузки фильтров
  var closeFotoPreview = listPicture.querySelector('.img-upload__cancel');// зачек крестика

  var onPreviewEscPress = function (evt) {
    window.util.isEscEvent(evt, closePreview);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPreview = function () {
    uploadFotoOverlay.classList.remove('hidden');
    listPicture.querySelector('#effect-none').checked = true;// значение по умолчанию
    fotoFiltersSlider.classList.add('hidden');// без слайдера на оригинале
    document.addEventListener('keydown', onPreviewEscPress);// закрытие окна на esc
  };

  var closePreview = function () {
    uploadFotoOverlay.classList.add('hidden');
    // uploadFileInput.value = '';// надо ли??
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

  closeFotoPreview.addEventListener('click', function () {
    closePreview();
  });

  closeFotoPreview.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      closePreview();
    }
  });

  // Пустой массив для хранения фотографий пользователей
  var fotos = [];
  window.picture.generatePictures(fotos);
  window.picture.renderPictures(fotos);
  // openPopup();

  // Показ оверлея с текущей выбранной картинки при клике
  listPicture.addEventListener('click', function (evt) {
    // debugger;
    var target = evt.target;
    var currentElement;

    if (target.parentNode.classList.contains('picture')) {
      openPopup();
      currentElement = window.util.findCurrentIndex(window.photoCollection, target.parentNode);
      window.preview.pasteBigPicture(fotos[currentElement]);
    }
  });

  // Показ оверлея с текущей выбранной картинки при нажатии клавиши
  listPicture.addEventListener('keydown', function (evt) {
    var target = evt.target;
    var currentElement;

    if (evt.keyCode === window.ENTER_KEYCODE && target.classList.contains('picture')) {
      openPopup();
      currentElement = window.util.findCurrentIndex(window.photoCollection, target.parentNode);
      window.preview.pasteBigPicture(fotos[currentElement]);
    }
  });

})();
