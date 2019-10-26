'use strict';

(function () {
  var pin = document.querySelector('.effect-level__pin'); // кнопка изменения глубыины эффекта
  var pinDepth = document.querySelector('.effect-level__depth'); // полоса насыщености эфекта (линия насыщености)

  var listPicture = document.querySelector('.pictures');
  var uploadPhotoPreview = listPicture.querySelector('.img-upload__preview'); // пред просмотр
  var photoFiltersSlider = listPicture.querySelector('.img-upload__effect-level'); // слайдер изменения глубины эффекта

  window.MIN_CLIENT_X = 0; // мин координата пина относительно левого края
  window.MAX_CLIENT_X = 445; // макс координата пина относительно правого края
  var MAX_DEPTH_VAL = 100; // макс значение глубины цвета
  var DEFAULT_PHOTO_FILTER = 'img-upload__preview';

  window.filter = {
    // Функция сброса значение фильтров
    dropFilter: function () {
      uploadPhotoPreview.style.filter = ''; // сброс значения
      pin.style.left = window.MAX_CLIENT_X + 'px'; // значение пина по усолчанию
      pinDepth.style.width = MAX_DEPTH_VAL + '%'; // значение насфщености по умолчанию
    },

    // функция наложения эфектов на фото
    changePhotoFilter: function (currentFilter) {
      window.filter.dropFilter();

      if (currentFilter !== 'none') {
        photoFiltersSlider.classList.remove('hidden');
        uploadPhotoPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
        uploadPhotoPreview.classList.add('effects__preview--' + currentFilter);
      } else if (currentFilter !== 'none') {
        uploadPhotoPreview.style.filter = 'grayscale(1)';
      } else if (currentFilter !== 'none') {
        uploadPhotoPreview.style.filter = 'sepia(1)';
      } else if (currentFilter !== 'none') {
        uploadPhotoPreview.style.filter = 'invert(100%)';
      } else if (currentFilter !== 'none') {
        uploadPhotoPreview.style.filter = 'blur(3px)';
      } else if (currentFilter !== 'none') {
        uploadPhotoPreview.style.filter = 'brightness(0.03)';
      } else {
        uploadPhotoPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
        photoFiltersSlider.classList.add('hidden');
      }
    },

    filtration: function (filterValue) {
      var proportion = (3 * filterValue) / 100; // пропорция для расчета уровня фильтра

      if (uploadPhotoPreview.classList.contains('effects__preview--chrome')) {
        uploadPhotoPreview.style.filter = 'grayscale(' + filterValue + '% )';
      } else if (uploadPhotoPreview.classList.contains('effects__preview--sepia')) {
        uploadPhotoPreview.style.filter = 'sepia(' + filterValue + '% )';
      } else if (uploadPhotoPreview.classList.contains('effects__preview--marvin')) {
        uploadPhotoPreview.style.filter = 'invert(' + filterValue + '%)';
      } else if (uploadPhotoPreview.classList.contains('effects__preview--phobos')) {
        uploadPhotoPreview.style.filter = 'blur(' + proportion + 'px)';
      } else if (uploadPhotoPreview.classList.contains('effects__preview--heat')) {
        uploadPhotoPreview.style.filter = 'brightness(' + proportion + ')';
      } else {
        return;
      }
    }
  };
})();
