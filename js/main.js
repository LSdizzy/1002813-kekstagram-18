'use strict';


var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PICTURES_NUM = 25;
var COMMENTS_MINIMUM_NUM = 1;
var pictures = [];
var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function generatePictures() {
  for (var i = 0; i < PICTURES_NUM; i++) {
    var url = 'photos/' + (i + 1) + '.jpg';
    var likes = getRandom(MIN_LIKES, MAX_LIKES);
    var comments = generateComments();

    pictures.push({url: url, likes: likes, comments: comments});
  }
}

generatePictures();

function findRandomValue(num) {
  return Math.floor(Math.random() * num);
}

// function generateLikes() {
//   var likes = 0;
//   while (likes < MIN_LIKES || likes > MAX_LIKES) {
//     likes = Math.floor(Math.random() * MAX_LIKES);
//   }
//   return (likes);
// }

var getRandom = function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

function generateComments() {
  var comments = [];
  var commentsNum = findRandomValue(20) + COMMENTS_MINIMUM_NUM;
  for (var i = 0; i < commentsNum; i++) {
    comments.push(commentsArray[Math.floor(Math.random() * commentsArray.length)]);
    if (findRandomValue(MAX_LIKES) % 2 !== 0) {
      comments[i] = comments[i] + ' ' + commentsArray[Math.floor(Math.random() * commentsArray.length)];
    }
  }
  return (comments);
}
