'use strict'

(function() {
  var hashtagsInput = uploadImages.querySelector('.text__hashtags');//поле ввода хештегов
  var commentInput = uploadImages.querySelector('.text__description');//поле ввода коментариев
  var submitFormBtn = uploadImages.querySelector('.img-upload__submit');//кнопка отправки формы

  var pin = document.querySelector('.effect-level__pin');//кнопка изменения глубыины эффекта
  var pinValue = document.querySelector('effect-level__value');//значение кнопки наложеного эффекта
  var pinDepth = document.querySelector('.effect-level__depth');//полоса насыщености эфекта (линия насыщености)

  var uploadEffectsList = document.querySelector('.img-upload__effects');//список фильтров
  var uploadForm = document.querySelector('.img-upload__form');//форма

  hashtagsInput.addEventListener('input', function () {
    window.validation.validateHahtags(hashtagsInput);
  });

  commentInput.addEventListener('input', function () {
    window.validation.validateComment(commentInput);
  });

  //работа с фильтром
  uploadEffectsList.addEventListener('change', function (evt) {
    var targetValue = evt.target.value;
    window.filter.changeFotoFilter(targetValue);
  });

  pin.addEventListener('mouseup', function(evt) {
    evt.preventDefault();
    var deviation;
    var percent;

    var startCoords = {
      x: evt.clientX
    };

    var shift = {
      x: startCoords.x - evt.clientX
    };

    deviation = pin.offsetLeft - shift.x;
    percent = Math.ceil((deviation * 100) / window.MAX_CLIENT_X);//Расчет % текущего подложения пина относительно шкалы

    if (deviation >= window.MIN_CLIENT_X && deviation <= window.MAX_CLIENT_X) {
      pin.style.left = deviation + 'px';
      // pinValue.setAttribute('value', percent);
      pinDepth.style.width = percent + '%';//Принимает процентное соотношение
      window.filter.filtration(percent);
    }
  });

})();
