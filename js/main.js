'use strict';
var similarListElement = document.getElementById('#picture');

var similarPictureTemplate = document.getElementById('#picture').content.querySelector('.picture');


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
  var commentsNum = findRandomValue(20) + COMMENTS_MINIMUM_NUM;
  for (var i = 0; i < commentsNum; i++) {
    comments.push(commentsArray[Math.floor(findRandomValue() * commentsArray.length)]);
    if (findRandomValue(MAX_LIKES) % 2 !== 0) {
      comments[i] = comments[i] + ' ' + commentsArray[Math.floor(findRandomValue() * commentsArray.length)];
    }
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

var picturesMocks = generatePictures(picturesMocks);

function createPicture(picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').url = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
}

function renderPictures(arr) {
  var fragment = renderPictures(picturesMocks);
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPicture(arr[i]));
  }
  similarListElement.appendChild(fragment);
}

renderPictures();
