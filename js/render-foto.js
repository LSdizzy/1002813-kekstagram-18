'use strict'

(function() {
  var listPicture = document.querySelector('.pictures');

  window.renderPictures(arr){
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createPicture(arr[i]));
    }

    listPicture.appendChild(fragment);
    window.collectionPicture = document.querySelectorAll('.picture');
  };
});
