'use strict';

(function () {
  var uploadImages = document.querySelector('.img-upload');
  var hashtagsInput = uploadImages.querySelector('.text__hashtags'); // поле ввода хештегов
  var commentInput = uploadImages.querySelector('.text__description'); // поле ввода коментариев
  // var submitFormBtn = uploadImages.querySelector('.img-upload__submit'); // кнопка отправки формы

  var pin = document.querySelector('.effect-level__pin'); // кнопка изменения глубыины эффекта
  var pinValue = document.querySelector('effect-level__value'); // значение кнопки наложеного эффекта
  var pinDepth = document.querySelector('.effect-level__depth'); // полоса насыщености эфекта (линия насыщености)

  var uploadEffectsList = document.querySelector('.img-upload__effects'); // список фильтров
  var uploadForm = document.querySelector('.img-upload__form'); // форма

  function resetForm(form) {
    form.submit();
    setTimeout(function () {
      form.reset();
      window.filter.dropFilter();
    }, 100);
  }

  hashtagsInput.addEventListener('input', function () {
    window.validation.validateHahtags(hashtagsInput);
  });

  commentInput.addEventListener('input', function () {
    window.validation.validateComment(commentInput);
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    resetForm(uploadForm);
  });

  // работа с фильтром
  uploadEffectsList.addEventListener('change', function (evt) {
    var targetValue = evt.target.value;
    window.filter.changeFotoFilter(targetValue);
  });

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var deviation;
      var percent;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      deviation = pin.offsetLeft - shift.x;
      // Расчет (%) нахождения текущего подложения пина относительно шкалы изменения насыщенности
      percent = Math.ceil((deviation * 100) / window.MAX_CLIENT_X);


      if (deviation >= window.MIN_CLIENT_X && deviation <= window.MAX_CLIENT_X) {
        pin.style.left = deviation + 'px';
        pinValue.setAttribute('value', percent);
        pinDepth.style.width = percent + '%';
        window.filter.filtration(percent);
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
