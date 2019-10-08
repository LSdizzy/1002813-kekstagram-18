'use strict';
var listPicture = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content;


var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PICTURES_NUM = 25;
var COMMENTS_MINIMUM_NUM = 1;
var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function findRandomValue(num) {
  return Math.floor(Math.random() * num);
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generateComments() {
  var comments = [];
  var commentsNum = findRandomValue(5) + COMMENTS_MINIMUM_NUM;

  for (var i = 0; i < commentsNum; i++) {
    comments.push(commentsArray[Math.floor(findRandomValue(6))]);
  }

  return comments;
}

function generatePictures() {
  var pictures = [];

  for (var i = 0; i < PICTURES_NUM; i++) {
    var url = 'photos/' + (i + 1) + '.jpg';
    var likes = randomInteger(MIN_LIKES, MAX_LIKES);
    var comments = generateComments();

    pictures.push({url: url, likes: likes, comments: comments});
  }

  return pictures;
}

var picturesMocks = generatePictures();

function createPicture(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
}

function renderPictures(mocks) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mocks.length; i++) {
    fragment.appendChild(createPicture(mocks[i]));
  }
  listPicture.appendChild(fragment);
}

renderPictures(picturesMocks);

// задание 8
var uploadImages = document.querySelector('.img-upload');
var uploadFileInput = uploadImages.querySelector('.img-upload__input');//поле загрузки фильтров
var closeFotoPreview = uploadImages.querySelector('.img-upload__cancel');//зачек крестика
var uploadFotoOverlay = uploadImages.querySelector('.img-upload__overlay');//форма редактирования
var uploadFotoPreview = uploadImages.querySelector('.img-upload__preview');//пред просмотр
var fotoFiltersSlider = uploadImages.querySelector('.img-upload__effect-level');//слайдер изменения глубины эффекта

var hashtagsInput = uploadImages.querySelector('.text__hashtags');//поле ввода хештегов
var commentInput = uploadImages.querySelector('.text__description');//поле ввода коментариев
var submitFormBtn = uploadImages.querySelector('.img-upload__submit');//кнопка отправки формы

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

uploadFileInput.addEventListener('change', function () {
  openPreview();
});

closeFotoPreview.addEventListener('click', function () {
  closePreview();
});

closeFotoPreview.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePreview();
  }
});

var onPreviewEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && hashtagsInput !== evt.target && commentInput !== evt.target) {
    closePreview();
  }
}; // нажатие на esc не реагирует когда поля ввода активны

var openPreview = function () {
  uploadFotoOverlay.classList.remove('hidden');
  uploadImages.querySelector('#effect-none').checked = true;//значение по умолчанию
  fotoFiltersSlider.classList.add('hidden');//без слайдера на оригинале
  document.addEventListener('keydown', onPreviewEscPress);//закрытие окна на esc
};

var closePreview = function () {
  uploadFotoOverlay.classList.add('hidden');
  // uploadFileInput.value = '';// надо ли??
  document.removeEventListener('keydown', onPreviewEscPress);
};


hashtagsInput.addEventListener('input', function () {
  validateHahtags(hashtagsInput);
});

commentInput.addEventListener('input', function () {
  validateComment(commentInput);
});


function validateHahtags(input) {
  var hashtagsArray = input.value.toLowerCase().split(' ');
  var currentElement;
  for (var i = 0; i < hashtagsArray.length; i++) {
    currentElement = hashtagsArray[i];
    if (hashtagsArray.indexOf(' ') !== -1) {
      input.setCustomValidity('хэш-теги разделяются пробелами');
    } else if (currentElement.charAt(0) !== '#') {
      input.setCustomValidity('хештег должен начинаться с символа #');
    } else if (findSameHashtags(hashtagsArray, currentElement)) {
      input.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    } else if (currentElement.length <= 1) {
      input.setCustomValidity('хештег не должен состоять только из символа #');
    } else if (currentElement.length > 20) {
      input.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else if (hashtagsArray.length > 5) {
      input.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else {
      input.setCustomValidity('');
    }
  }
}

function validateComment(input) {
  if (input.value.length > 140) {
    input.setCustomValidity('длина комментария не может составлять больше 140 символов');
  } else {
    input.setCustomValidity('');
  }
}

function findSameHashtags(array, item) {
  // debugger;
  var hashtags = [];
  var wordiIdx = array.indexOf(item);
  while (wordiIdx !== -1) {
    hashtags.push(wordiIdx);
    wordiIdx = array.indexOf(item, wordiIdx + 1);
  }
  if (hashtags.length > 1) {
    return true;
  }
  return false;
}

// var minArrow = uploadImages.querySelector('.scale__control--smaller');//стрелка мин
// var maxArrow = uploadImages.querySelector('.scale__control--bigger ');//стрелка макс
// var fieldValue = uploadImages.querySelector('.scale__control--value');//значение поля

var uploadEffectsList = document.querySelector('.img-upload__effects');//список фильтров

// Функция сброса значение фильтров
function dropFilter() {
  uploadFotoPreview.style.filter = '';//сброс значения
  pin.style.left = MIN_CLIENT_X + 'px';//значение пина по усолчанию
  pinDepth.style.width = MAX_DEPTH_VAL + '%';//значение насфщености по умолчанию
};

//функция наложения эфектов на фото
var changeFotoFilter = function (currentFilter) {
  dropFilter();

  if (currentFilter !== 'none') {
    fotoFiltersSlider.classList.remove('hidden');
    uploadFotoPreview.setAttribute('class', 'img-upload__preview');
    uploadFotoPreview.classList.add('effects__preview--' + currentFilter);
  } else {
    uploadFotoPreview.setAttribute('class', 'img-upload__preview');
    fotoFiltersSlider.classList.add('hidden');
  }
};

//работа с фильтром
uploadEffectsList.addEventListener('change', function (evt) {
  var targetValue = evt.target.value;
  changeFotoFilter(targetValue);
});

var pin = uploadImages.querySelector('.effect-level__pin');//кнопка изменения глубыины эффекта
var pinValue = uploadImages.querySelector('effect-level__value');//значение кнопки наложеного эффекта
var pinDepth = uploadImages.querySelector('.effect-level__depth');//полоса насыщености эфекта (линия насыщености)
var MIN_CLIENT_X = 0;// мин координата пина относительно левого края
var MAX_CLIENT_X = 445;// макс координата пина относительно правого края
var MAX_DEPTH_VAL = 100;// макс значение глубины цвета


