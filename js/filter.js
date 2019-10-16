'use strict'

window.filter = (function(){
  var pin = document.querySelector('.effect-level__pin');//кнопка изменения глубыины эффекта
  var pinValue = document.querySelector('effect-level__value');//значение кнопки наложеного эффекта
  var pinDepth = document.querySelector('.effect-level__depth');//полоса насыщености эфекта (линия насыщености)

  var listPicture = document.querySelector('.pictures');
  var uploadFotoPreview = uploadImages.querySelector('.img-upload__preview');//пред просмотр
  var fotoFiltersSlider = uploadImages.querySelector('.img-upload__effect-level');//слайдер изменения глубины эффекта


  window.MIN_CLIENT_X = 0;// мин координата пина относительно левого края
  window.MAX_CLIENT_X = 445;// макс координата пина относительно правого края
  window.MAX_DEPTH_VAL = 100;// макс значение глубины цвета
  var DEFAULT_PHOTO_FILTER = 'img-upload__preview';

  return {
    //Функция сброса значение фильтров
    dropFilter: function() {
      uploadFotoPreview.style.filter = '';//сброс значения
      pin.style.left = MAX_CLIENT_X + 'px';//значение пина по усолчанию
      pinDepth.style.width = MAX_DEPTH_VAL + '%';//значение насфщености по умолчанию
    },

    //функция наложения эфектов на фото
    changeFotoFilter: function(currentFilter) {
      window.filter.dropFilter();

      if (currentFilter !== 'none') {
        fotoFiltersSlider.classList.remove('hidden');
        uploadFotoPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
        uploadFotoPreview.classList.add('effects__preview--' + currentFilter);
      } else if (currentFilter !== 'none') {
        uploadFotoPreview.style.filter='grayscale(1)';
      } else if (currentFilter !== 'none') {
        uploadFotoPreview.style.filter='sepia(1)';
      } else if (currentFilter !== 'none') {
        uuploadFotoPreview.style.filter='invert(100%)';
      } else if (currentFilter !== 'none') {
        uploadFotoPreview.style.filter='blur(3px)';
      } else if (currentFilter !== 'none') {
        uploadFotoPreview.style.filter='brightness(3)';
      } else {
        uploadFotoPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
        fotoFiltersSlider.classList.add('hidden');
      }
    },

    filtration: function(filterValue) {
      var proportion = (3 * filterValue) / 100;// пропорция для расчета уровня фильтра

      if (uploadFotoPreview.classList.contains('effects__preview--chrome')) {
        uploadFotoPreview.style.filter = 'grayscale(' + filterValue + '% )';
      } else if (uploadFotoPreview.classList.contains('effects__preview--sepia')) {
        uploadFotoPreview.style.filter = 'sepia(' + filterValue + '% )';
      } else if (uploadFotoPreview.classList.contains('effects__preview--marvin')) {
        uploadFotoPreview.style.filter = 'invert(' + filterValue + '%)';
      } else if (uploadFotoPreview.classList.contains('effects__preview--phobos')) {
        uploadFotoPreview.style.filter = 'blur(' + proportion + 'px)';
      } else if (uploadFotoPreview.classList.contains('effects__preview--heat')) {
        uploadFotoPreview.style.filter = 'brightness(' + proportion + ')';
      } else {
        return;
      }
    }
  };
})();
