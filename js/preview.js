'use strict';

(function () {
  var socialComments = document.querySelector('.social__comments');
  var socialComment = document.querySelector('.social__comment');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var bigPicture = document.querySelector('.big-picture');

  window.preview = {
    // Функция создания DOM-элемента комментарий к bigFoto с помощью разметки
    createComment: function (comment) {
      var currentComment = socialComment.cloneNode(true);

      currentComment.querySelector('.social__picture').setAttribute('src', comment.avatar);
      currentComment.querySelector('.social__text').textContent = comment.message;

      return currentComment;
    },

    changeBigPicture: function (basePicture) {
      bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', basePicture.url);
      bigPicture.querySelector('.likes-count').textContent = basePicture.likes;
      bigPicture.querySelector('.comments-count').textContent = basePicture.comments.length;
      bigPicture.querySelector('.social__caption').textContent = basePicture.description;
    },

    pasteBigPicture: function (baseElement) {
      window.preview.changeBigPicture(baseElement);

      socialCommentCount.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < baseElement.comments.length; i++) {
        var commentElement = window.preview.createComment(baseElement.comments[i]);
        fragment.appendChild(commentElement);
      }

      socialComments.innerHTML = '';
      socialComments.appendChild(fragment);
    }
  };
})();
