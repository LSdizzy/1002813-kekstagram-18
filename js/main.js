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

var uploadFileInput = document.querySelector('.img-upload__input');//поле загрузки фильтров
var closeFotoPreview = document.querySelector('.img-upload__cancel');//зачек крестика
var uploadFotoOverlay = document.querySelector('.img-upload__overlay');//форма редактирования
var uploadFotoPreview = document.querySelector('.img-upload__preview');//пред просмотр

var hashtagsInput = document.querySelector('.text__hashtags');//поле ввода хештегов
var commentInput = document.querySelector('.text__description');//поле ввода коментариев
var submitFormBtn = document.querySelector('.img-upload__submit');//кнопка отправки формы

uploadFileInput.addEventListener('change', function () {
  openPreview();
});

closeFotoPreview.addEventListener('click', function () {
  closePreview();
});

closeFotoPreview.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePreview();
  }
});

var onPreviewEscPress = function (evt) {
  if (evt.keyCode === 27 && hashtagsInput !== document.activeElement && commentInput !== document.activeElement) {
    closePreview();
  }
}; // нажатие на esc не реагирует когда поля ввода активны

var openPreview = function () {
  uploadFotoOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPreviewEscPress);
};

var closePreview = function () {
  uploadFotoOverlay.classList.add('hidden');
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

var minArrow = document.querySelector('.scale__control--smaller');//стрелка мин
var maxArrow = document.querySelector('.scale__control--bigger ');//стрелка макс
var fieldValue = document.querySelector('.scale__control--value');//значение поля
var uploadEffectsList = document.querySelector('.img-upload__effects');//список фильтров

//функция наложения эфектов на фото
var changeFotoFilter = function (currentFilter) {
  // debugger;
  if (currentFilter !== 'none') {
    uploadFotoPreview.setAttribute('class', 'img-upload__preview');
    uploadFotoPreview.classList.add('effects__preview--' + currentFilter);
  } else {
    uploadFotoPreview.setAttribute('class', 'img-upload__preview');
  }
};

//работа с фильтром
uploadEffectsList.addEventListener('change', function (evt) {
  // debugger;
  var targetValue = evt.target.value;
  changeFotoFilter(targetValue);
});
