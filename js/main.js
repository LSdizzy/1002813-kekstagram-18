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

var formRegistrationOpen = document.querySelector('#upload-file');
var formRegistrationClose = document.querySelector('#upload-cancel');
var formRedaktorFoto = document.querySelector('.img-upload__overlay');

var hashtagsInput = document.querySelector('.text__hashtags');//поле ввода хештегов
var commentInput = document.querySelector('.text__description');//поле ввода коментариев
var submitFormBtn = document.querySelector('.img-upload__submit');//кнопка отправки формы

formRegistrationOpen.addEventListener('click', function () {
  openForm();
});

formRegistrationClose.addEventListener('click', function () {
  closeForm();
});

formRegistrationClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeForm();
  }
});

var onPreviewEscPress = function (evt) {
  if (evt.keyCode === 27 && hashtagsInput !== document.activeElement && commentInput !== document.activeElement) {
    closeForm();
  }
}; // нажатие на esc не реагирует когда поля ввода активны

var openForm = function () {
  formRedaktorFoto.classList.remove('hidden');
  document.addEventListener('keydown', onPreviewEscPress);
};

var closeForm = function () {
  formRedaktorFoto.classList.add('hidden');
  document.removeEventListener('keydown', onPreviewEscPress);
};


hashtagsInput.addEventListener('input', function () {
  validateHahtags(hashtagsInput);
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
    } else if (hashtagsArray.length > 5) {
      input.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else {
      input.setCustomValidity('Ошибка!');
    }
  }
}


function findSameHashtags(array, item) {
  debugger
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
