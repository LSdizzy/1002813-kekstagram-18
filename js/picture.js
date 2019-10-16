'use strict'

window.picture = (function(){
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var PICTURES_NUM = 25;
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

  return {
    createPicture: function(picture) {
      var pictureTemplate = document.querySelector('#picture').content;
      var pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').setAttribute('src', picture.user);
      pictureElement.querySelector('.picture__likes').textContent = picture.likes;
      pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
      pictureElement.querySelector('picture').setAttribute('tabindex', '0');//для валидности

      return pictureElement;
    },

    //функция генерации коментариев
    function generateComments() {
      var comments = [];
      var commentsNum = window.util.randomInteger(1, 4);
      var comment;

      for (var i = 0; i < commentsNum; i++) {
        comment = USER_COMMENTS[window.util.findRandomValue(USER_COMMENTS)];
        if (comments.indexOf(comment) === -1) {
          comments.push(comment);
        }
      }

      return comments;
    },

    function generatePictures(arr) {
      var element;

      for (var i = 1; i <= PICTURES_NUM; i++) {
        element = {
          user: 'photos/' + i + '.jpg',
          likes: window.util.randomInteger(MIN_LIKES, MAX_LIKES),
          comments: window.picture.generateComments(),
          description: USER_DESCRIPTION[window.util.findRandomValue(USER_DESCRIPTION)]
        };

        arr.push(element);
      }
    },
    //функция помешения на страницу дом-элементо
    function renderPictures(arr) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(window.picture.createPicture(arr[i]));
      }
      listPicture.appendChild(fragment);
    }
  };


})();
