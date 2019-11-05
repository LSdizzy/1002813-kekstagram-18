'use strict';

(function () {

  var OK = 200;
  var BAD_REQUEST = 400;
  var NOT_FOUND = 404;
  var UNAUTHORIZED = 401;
  var SERVER_ERROR = 500;

  window.backend = {
    load: function (onSuccess, onError, url) {
      var xhr = createXMLHttpRequest('GET', url);
      addRequestEventListeners(xhr, onSuccess, onError);
      xhr.send();
    },
    save: function (onSuccess, onError, data, url) {
      var xhr = createXMLHttpRequest('POST', url);
      addRequestEventListeners(xhr, onSuccess, onError);
      xhr.send(data);
    }
  };

  function createXMLHttpRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

    return xhr;
  }

  function addRequestEventListeners(xhr, onSuccess, onError) {
    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    function onXhrLoad() {
      switch (xhr.status) {
        case OK:
          onSuccess(xhr.response);
          break;
        case BAD_REQUEST:
          onError('Ошибка ' + xhr.status + ' ' + 'Неверный запрос');
          break;
        case UNAUTHORIZED:
          onError('Ошибка ' + xhr.status + ' ' + 'Пользователь не авторизован');
          break;
        case NOT_FOUND:
          onError('Ошибка ' + xhr.status + ' ' + 'Информация не найдена');
          break;
        case SERVER_ERROR:
          onError(xhr.status + xhr.statusText + 'Ошибка сервера');
          break;
        default:
          onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }

      xhr.removeEventListener('load', onXhrLoad);
    }

    function onXhrError() {
      onError('Произошла ошибка соединения');
      xhr.removeEventListener('error', onXhrError);
    }

    function onXhrTimeout() {
      onError('Запрос не успел выполниться');
      xhr.removeEventListener('timeout', onXhrTimeout);
    }
  }
})();
