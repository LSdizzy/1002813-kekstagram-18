'use strict';
var MIN_CLIENT_X = 0;// мин координата пина относительно левого края
var MAX_CLIENT_X = 445;// макс координата пина относительно правого края
var MAX_DEPTH_VAL = 100;// макс значение глубины цвета

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PICTURES_NUM = 25;
var COMMENTS_MINIMUM_NUM = 1;
var USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var USER_DESCRIPTION = [
  'Тестим камеру!',
  'Затусили с друзьями на море',
  'Мне кажется или это фотошоп',
  'ЮЮЮЮхууууууу!',
  'Помоему это всетаки фотошоп!',
  'О у меня такая тачка!'
];

var listPicture = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content;

var pin = document.querySelector('.effect-level__pin');//кнопка изменения глубыины эффекта
var pinValue = document.querySelector('effect-level__value');//значение кнопки наложеного эффекта
var pinDepth = document.querySelector('.effect-level__depth');//полоса насыщености эфекта (линия насыщености)

var socialComments = document.querySelector('.social__comments');
var socialComment = document.querySelector('.social__comment');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

var uploadImages = document.querySelector('.img-upload');
var uploadFileInput = uploadImages.querySelector('.img-upload__input');//поле загрузки фильтров
var closeFotoPreview = uploadImages.querySelector('.img-upload__cancel');//зачек крестика
var uploadFotoOverlay = uploadImages.querySelector('.img-upload__overlay');
uploadFotoOverlay.classList.add('hidden');//форма редактирования
var uploadFotoPreview = uploadImages.querySelector('.img-upload__preview');//пред просмотр
var uploadEffectsList = document.querySelector('.img-upload__effects');//список фильтров
var fotoFiltersSlider = uploadImages.querySelector('.img-upload__effect-level');//слайдер изменения глубины эффекта

var hashtagsInput = uploadImages.querySelector('.text__hashtags');//поле ввода хештегов
var commentInput = uploadImages.querySelector('.text__description');//поле ввода коментариев
var submitFormBtn = uploadImages.querySelector('.img-upload__submit');//кнопка отправки формы

// var minArrow = uploadImages.querySelector('.scale__control--smaller');//стрелка мин
// var maxArrow = uploadImages.querySelector('.scale__control--bigger ');//стрелка макс
// var fieldValue = uploadImages.querySelector('.scale__control--value');//значение поля

var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');
var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');

uploadFileInput.addEventListener('change', function () {
  openPreview();
});

// Пустой массив для хранения фотографий пользователей
var fotos = [];

////////////////////////////////////////////////////////

closeFotoPreview.addEventListener('click', function () {
  closePreview();
});

closeFotoPreview.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePreview();
  }
});

closeBigPicture.addEventListener('click', function() {
  closePopup();
});

closeBigPicture.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

pin.addEventListener('mouseup', function(evt) {
  // debugger;
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
  percent = Math.ceil((deviation * 100) / MAX_CLIENT_X);//Расчет % текущего подложения пина относительно шкалы

  if (deviation >= MIN_CLIENT_X && deviation <= MAX_CLIENT_X) {
    pin.style.left = deviation + 'px';
    // pinValue.setAttribute('value', percent);
    pinDepth.style.width = percent + '%';//Принимает процентное соотношение
    filtration(percent);
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

var closePreview = function() {
  uploadFotoOverlay.classList.add('hidden');
  // uploadFileInput.value = '';// надо ли??
  document.removeEventListener('keydown', onPreviewEscPress);
};

var openPopup = function() {
  uploadFotoOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPreviewEscPress);
}

var closePopup = function() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPreviewEscPress);
}

////////////////////////////////////////////////////////////////

//функция наложения эфектов на фото
var changeFotoFilter = function (currentFilter) {
  dropFilter();
  debugger;
  if (currentFilter !== 'none') {
    fotoFiltersSlider.classList.remove('hidden');
    // uploadFotoPreview.setAttribute('class', 'img-upload__preview');
    uploadFotoPreview.classList.add('effects__preview--' + currentFilter);
  } else if (currentFilter !== 'none') {
    uploadFotoPreview.style.filter = 'grayscale(1)';
  } else if (currentFilter !== 'none') {
    uploadFotoPreview.style.filter = 'sepia(1)';
  } else if (currentFilter !== 'none') {
    uuploadFotoPreview.style.filter = 'invert(100%)';
  } else if (currentFilter !== 'none') {
    uploadFotoPreview.style.filter = 'blur(3px)';
  } else if (currentFilter !== 'none') {
    uploadFotoPreview.style.filter = 'brightness(3)';
  } else {
    uploadFotoPreview.setAttribute('class', 'img-upload__preview');
    fotoFiltersSlider.classList.add('hidden');
  }
};

//Функция сброса значение фильтров
function dropFilter() {
  uploadFotoPreview.style.filter = '';//сброс значения
  // pin.style.left = MAX_CLIENT_X + 'px';//значение пина по усолчанию
  // pinDepth.style.width = MAX_DEPTH_VAL + '%';//значение насфщености по умолчанию
};

//работа с фильтром
uploadEffectsList.addEventListener('change', function (evt) {
  var targetValue = evt.target.value;
  changeFotoFilter(targetValue);
});

function filtration(filterValue) {
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

////////////////////////////////////////////////////////

function findRandomValue(num) {
  return Math.floor(Math.random() * num);
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

//функция генерации коментариев
function generateComments() {
  var comments = [];
  var commentsNum = findRandomValue(5) + COMMENTS_MINIMUM_NUM;

  for (var i = 0; i < commentsNum; i++) {
    comments.push(USER_COMMENTS[Math.floor(findRandomValue(6))]);
  }

  return comments;
}

function generatePictures(arr) {
  var element;

  for (var i = 1; i <= PICTURES_NUM; i++) {
    element = {
      user: 'photos/' + i + '.jpg',
      likes: randomInteger(MIN_LIKES, MAX_LIKES),
      comments: generateComments(),
      description: USER_DESCRIPTION[findRandomValue(USER_DESCRIPTION)]
    };
    arr.push(element);
  }
}

generatePictures(fotos);



function createPicture(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  // debugger;
  pictureElement.querySelector('.picture__img').setAttribute('src', picture.user);
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  // pictureElement.querySelector('picture').setAttribute('tabindex', '0');//для валидности

  return pictureElement;
}


//функция помешения на страницу дом-элементо
function renderPictures(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPicture(arr[i]));
  }
  listPicture.appendChild(fragment);
}

//Функция создания DOM-элемента комментарий к bigFoto с помощью разметки
function createComment(comment) {
  // debugger;
  var currentComment = socialComment.cloneNode(true);

  currentComment.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + randomInteger(1, 6) + '.svg');
  currentComment.querySelector('.social__text').textContent = comment;

  return currentComment;
}

renderPictures(fotos);

function changeBigPicture(basePicture) {
  // debugger;
  bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', basePicture.user);
  bigPicture.querySelector('.likes-count').textContent = basePicture.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPicture.comments.length;
  bigPicture.querySelector('social__caption').textContent = bigPicture.description;
}

function pasteBigPicture(baseElement) {
  changeBigPicture(baseElement);

  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < baseElement.comments.length; i++) {
    var commentElement = createComment(baseElement.comments[i]);
    fragment.appendChild(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
}

openPopup();


////////////////////////////////////////////////////////////

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
