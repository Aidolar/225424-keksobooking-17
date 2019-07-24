'use strict';

(function () {
  var TIMEOUT = 10000;
  var CONTINUE_CODE = 100;
  var PROCESSING_CODE = 102;
  var OK_CODE = 200;
  var NO_CONTENT_CODE = 204;
  var BAD_REQUEST_CODE = 400;
  var UNAUTHORIZED_CODE = 401;
  var NOT_FOUND_CODE = 404;
  var INTERNAL_SERVER_ERROR_CODE = 500;
  var BAD_GATEWAY_CODE = 502;
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var uploadURL = 'https://js.dump.academy/keksobooking';

  var request = function (type, url) {
    return function (onSuccess, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var errorMessage;
        switch (xhr.status) {
          case CONTINUE_CODE:
            errorMessage = 'Продолжай';
            break;
          case PROCESSING_CODE:
            errorMessage = 'Идёт обработка';
            break;
          case OK_CODE:
            onSuccess(xhr.response);
            break;
          case NO_CONTENT_CODE:
            errorMessage = 'Нет содержимого';
            break;
          case BAD_REQUEST_CODE:
            errorMessage = 'Неверный запрос';
            break;
          case UNAUTHORIZED_CODE:
            errorMessage = 'Пользователь не авторизован';
            break;
          case NOT_FOUND_CODE:
            errorMessage = 'Ничего не найдено';
            break;
          case INTERNAL_SERVER_ERROR_CODE:
            errorMessage = 'Внутренняя ошибка сервера';
            break;
          case BAD_GATEWAY_CODE:
            errorMessage = 'Ошибочный шлюз';
            break;

          default:
            errorMessage = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }

        if (errorMessage) {
          onError(errorMessage);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open(type, url);
      xhr.send(data);
    };
  };

  window.requests = {
    load: request('GET', loadURL),
    upload: request('POST', uploadURL)
  };
})();
