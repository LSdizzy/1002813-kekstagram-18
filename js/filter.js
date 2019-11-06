'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var DEFAULT_SCALE_VALUE = 100;
  var DEFAULT_FILTER_INTENSITY = 100;

  var CHROME = 'effect-chrome';
  var SEPIA = 'effect-sepia';
  var MARVIN = 'effect-marvin';
  var PHOBOS = 'effect-phobos';
  var HEAT = 'effect-heat';
  var NONE = 'effect-none';

  var fileInput = document.querySelector('#upload-file');
  var uploadPicture = document.querySelector('.img-upload__preview img');
  fileInput.addEventListener('change', function () {
    openPictureEditor();
  });

  var pictureEditor = document.querySelector('.img-upload__overlay');
  var pictureEditorCloseButton = pictureEditor.querySelector('.img-upload__cancel');
  var form = document.querySelector('.img-upload__form');
  var scaleDecreaseButton = pictureEditor.querySelector('.scale__control--smaller');
  var scaleIncreaseButton = pictureEditor.querySelector('.scale__control--bigger');
  var scaleValueInput = pictureEditor.querySelector('.scale__control--value');
  var filtersList = pictureEditor.querySelector('.effects__list');
  var filterIntensityControl = pictureEditor.querySelector('.img-upload__effect-level');
  var filterIntensityPin = filterIntensityControl.querySelector('.effect-level__pin');
  var filterIntensityRange = filterIntensityControl.querySelector('.effect-level__line');
  var filterIntensityLine = filterIntensityControl.querySelector('.effect-level__depth');
  var filterIntensityInput = filterIntensityControl.querySelector('.effect-level__value');
  var imgUploadSubmit = document.querySelector('.img-upload__submit');
  var textHashtagsInput = document.querySelector('.text__hashtags');
  var defaultPreviewPicture = pictureEditor.querySelector('#effect-none');
  var descriptionTextarea = document.querySelector('.text__description');

  function openPictureEditor() {
    pictureEditorCloseButton.addEventListener('click', onPictureEditorCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    form.addEventListener('submit', onFormSubmit);
    scaleDecreaseButton.addEventListener('click', onScaleDecreaseButtonClick);
    scaleIncreaseButton.addEventListener('click', onScaleIncreaseButtonClick);
    filtersList.addEventListener('click', onFiltersListClick);
    filterIntensityPin.addEventListener('mousedown', onFilterIntensityPinMousedown);
    filterIntensityRange.addEventListener('click', onFilterIntensityRangeClick);
    imgUploadSubmit.addEventListener('click', onImgUploadSubmitClick);
    textHashtagsInput.addEventListener('input', onTextHashtagsInputInput);

    pictureEditor.classList.remove('hidden');
  }

  function closePictureEditor() {
    pictureEditor.classList.add('hidden');

    resetForm();

    pictureEditorCloseButton.removeEventListener('click', onPictureEditorCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    form.removeEventListener('submit', onFormSubmit);
    scaleDecreaseButton.removeEventListener('click', onScaleDecreaseButtonClick);
    scaleIncreaseButton.removeEventListener('click', onScaleIncreaseButtonClick);
    filtersList.removeEventListener('click', onFiltersListClick);
    filterIntensityPin.removeEventListener('mousedown', onFilterIntensityPinMousedown);
    filterIntensityRange.removeEventListener('click', onFilterIntensityRangeClick);
    imgUploadSubmit.removeEventListener('click', onImgUploadSubmitClick);
    textHashtagsInput.removeEventListener('input', onTextHashtagsInputInput);
  }

  function resetForm() {
    defaultPreviewPicture.checked = true;
    uploadPicture.style.transform = 'scale(${DEFAULT_SCALE_VALUE / 100})';
    scaleValueInput.value = DEFAULT_SCALE_VALUE + '%';
    uploadPicture.style.filter = 'none';
    filterIntensityControl.classList.add('hidden');
    fileInput.value = '';
    clearFormData();
  }

  function clearFormData() {
    descriptionTextarea.value = '';

    textHashtagsInput.value = '';
    if (textHashtagsInput.classList.contains('hashtags-invalid')) {
      textHashtagsInput.classList.remove('hashtags-invalid');
    }
  }

  function onPictureEditorCloseButtonClick() {
    closePictureEditor();
  }

  function onDocumentKeydown(evt) {
    var target = evt.target;

    if (window.util.isEscEvent(evt) && target.className !== textHashtagsInput && target.className !== descriptionTextarea) {
      closePictureEditor();
    }
  }

  function onFormSubmit(evt) {
    window.backend.save(onSuccessFormSubmit, onErrorFormSubmit, new FormData(form), URL);
    evt.preventDefault();
  }

  function onSuccessFormSubmit() {
    closePictureEditor();
    window.openMessageDialog();
  }

  function onErrorFormSubmit(errorMessage) {
    window.openMessageDialog(errorMessage);
  }

  function onScaleDecreaseButtonClick() {
    window.util.decreaseScale(scaleValueInput, uploadPicture);
  }

  function onScaleIncreaseButtonClick() {
    window.util.increaseScale(scaleValueInput, uploadPicture);
  }

  function onFiltersListClick(evt) {
    if (evt.target.classList.contains('effects__radio')) {
      updateFilterIntensityControl(DEFAULT_FILTER_INTENSITY);
      uploadPicture.style.filter = getPictureFilter(evt.target.id, DEFAULT_FILTER_INTENSITY);
      filterIntensityInput.value = DEFAULT_FILTER_INTENSITY;

      if (evt.target.id === 'effect-none') {
        filterIntensityControl.classList.add('hidden');
      } else {
        filterIntensityControl.classList.remove('hidden');
      }
    }
  }

  function onFilterIntensityPinMousedown() {
    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
  }

  function onDocumentMousemove(evt) {
    changeFilterIntensity(evt.clientX);
  }

  function onDocumentMouseup() {
    document.removeEventListener('mousemove', onDocumentMousemove);
    document.removeEventListener('mouseup', onDocumentMouseup);
  }

  function onFilterIntensityRangeClick(evt) {
    changeFilterIntensity(evt.clientX);
  }

  function changeFilterIntensity(value) {
    var filterIntensity = getFilterIntensity(value);

    updateFilterIntensityControl(filterIntensity);
    uploadPicture.style.filter = getPictureFilter(getActivePictureFilterId(), filterIntensity);
    filterIntensityInput.value = filterIntensity;
  }

  function getFilterIntensity(value) {
    var filterIntensityRangeLeftX = filterIntensityRange.getBoundingClientRect().left;
    var filterIntensityRangeRightX = filterIntensityRange.getBoundingClientRect().right;

    var relativeX;
    if (value < filterIntensityRangeLeftX) {
      relativeX = 0;
    } else if (value > filterIntensityRangeRightX) {
      relativeX = filterIntensityRange.clientWidth;
    } else {
      relativeX = (value - filterIntensityRangeLeftX);
    }

    return Math.round(relativeX / filterIntensityRange.clientWidth * 100);
  }

  function updateFilterIntensityControl(value) {
    filterIntensityPin.style.left = value + '%';
    filterIntensityLine.style.width = value + '%';
  }

  function getPictureFilter(id, value) {
    var proportion = (3 * value) / 100;
    switch (id) {
      case CHROME:
        return 'grayscale(' + value + '% )';
      case SEPIA:
        return 'sepia(' + value + '% )';
      case MARVIN:
        return 'invert(' + value + '%)';
      case PHOBOS:
        return 'blur(' + proportion + 'px)';
      case HEAT:
        return 'brightness(' + proportion + ')';
      case NONE:
        return 'none';
    }
  }

  function getActivePictureFilterId() {
    var previewPictures = document.querySelectorAll('.effects__radio');
    for (var i = 0; i < previewPictures.length; i++) {
      if (previewPictures[i].checked) {
        return previewPictures[i].id;
      }
    }
  }

  function onImgUploadSubmitClick() {
    var customErrorMessage = window.validateHashtags(textHashtagsInput.value);

    if (customErrorMessage !== null) {
      textHashtagsInput.setCustomValidity(customErrorMessage);
      textHashtagsInput.classList.add('hashtags-invalid');
    }
  }

  function onTextHashtagsInputInput() {
    if (textHashtagsInput.validity.customError !== '') {
      textHashtagsInput.setCustomValidity('');
      textHashtagsInput.classList.remove('hashtags-invalid');
    }
  }

})();
