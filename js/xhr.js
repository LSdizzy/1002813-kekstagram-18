'use strict';
window.xhr = (function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var errorPopup = document.querySelector('#error').content;
  var OK = 200;
  var BAD_REQUEST = 400;
  var NOT_FOUND = 404;
  var UNAUTHORIZED = 401;
  var SERVER_ERROR = 500;

  var sendRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case OK:
          window.data = xhr.response;
          onSuccess(xhr.response);
          break;
        case BAD_REQUEST:
          onError(xhr.status + xhr.statusText + 'Неверный запрос');
          break;
        case NOT_FOUND:
          onError(xhr.status + xhr.statusText + 'Ничего не найдено');
          break;
        case UNAUTHORIZED:
          onError(xhr.status + xhr.statusText + 'Пользователь не авторизован');
          break;
        case SERVER_ERROR:
          onError(xhr.status + xhr.statusText + 'Ошибка сервера');
          break;
        default:
          onError('Неизвестный статус' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  return {
    load: function (onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },

    error: function (errorMessage) {
      errorPopup.querySelector('.error__title').textContent = errorMessage;
      document.body.appendChild(errorPopup);
    }
  };
})();
